using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Xunit;
using System;
using System.Collections.Generic;
using System.Linq;

public class UnitTestGenerator
{
    // ... (Other methods: GenerateUnitTest, GenerateActSection remain the same)

    private static string GenerateArrangeSection(MethodDeclarationSyntax methodDeclaration)
    {
        string arrangeCode = "";
        var parameters = methodDeclaration.ParameterList.Parameters;

        // Check for a [Theory] attribute and inline data
        var theoryAttribute = methodDeclaration.AttributeLists
            .SelectMany(al => al.Attributes)
            .FirstOrDefault(a => a.Name.ToString() == "Theory");

        if (theoryAttribute != null)
        {
            // Get the inline data (assuming it's in [InlineData] attributes)
            var inlineDataAttributes = methodDeclaration.AttributeLists
                .SelectMany(al => al.Attributes)
                .Where(a => a.Name.ToString() == "InlineData")
                .ToList();

            if (inlineDataAttributes.Any())
            {
                arrangeCode += "// Test data from InlineData attributes\n";

                // Generate a new test method for each InlineData
                for (int i = 0; i < inlineDataAttributes.Count; i++)
                {
                    var inlineData = inlineDataAttributes[i];
                    var arguments = inlineData.ArgumentList.Arguments;

                    string testMethodName = $"{methodDeclaration.Identifier.Text}Test_{i}"; // Unique name

                    string testCaseCode = $@"
    [Fact]
    public void {testMethodName}()
    {{
        // Arrange
        ";

                    for (int j = 0; j < parameters.Count; j++)
                    {
                        if (j < arguments.Count) // Handle cases with fewer InlineData arguments
                        {
                            var argument = arguments[j];
                            testCaseCode += $"var {parameters[j].Identifier.Text} = {argument.ToString()};\n";
                        }
                        else
                        {
                            testCaseCode += $"var {parameters[j].Identifier.Text} = {GenerateTestData(parameters[j].Type)};\n"; // Default value if no InlineData
                        }

                    }

                    testCaseCode += $@"

        // Act
        {GenerateActSection(methodDeclaration.Parent.As<ClassDeclarationSyntax>().Identifier.Text, methodDeclaration.Identifier.Text, methodDeclaration)}

        // Assert
        {GenerateAssertSection(methodDeclaration, arguments.ElementAtOrDefault(parameters.Count-1)) } // Pass the expected value to GenerateAssertSection
    }}";
                    arrangeCode += testCaseCode;
                }
                return arrangeCode; // Return all generated test cases.
            }
        }

        // If no Theory attribute or InlineData, generate a single test case with default data
        foreach (var parameter in parameters)
        {
            arrangeCode += $"var {parameter.Identifier.Text} = {GenerateTestData(parameter.Type)};\n";
        }

        return arrangeCode;
    }


    private static string GenerateAssertSection(MethodDeclarationSyntax methodDeclaration, ArgumentSyntax expectedValueArgument)
    {
        string assertCode = "";

        if (methodDeclaration.ReturnType.ToString() != "void")
        {
            string expectedValue = (expectedValueArgument != null) ? expectedValueArgument.ToString() : GetExpectedValue(methodDeclaration.ReturnType); // Placeholder!  Needs logic!
            assertCode = $"Assert.Equal({expectedValue}, result);"; // xUnit Assert.Equal
        }

        return assertCode;
    }


    // ... (GenerateTestData and GetExpectedValue remain the same)

    public static void Main(string[] args)
    {
        string code = @"
public class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }

    [Theory]
    [InlineData(1, 2, 3)]
    [InlineData(5, 5, 10)]
    public int AddTheory(int a, int b, int expected)
    {
        return a + b;
    }

    // ... other methods
}
";

        string className = "Calculator";
        string methodName = "AddTheory";

        string unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);

        // ... (Other test cases in Main)
    }
}
