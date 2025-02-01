using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Xunit;
using System;
using System.Collections.Generic;
using System.Linq;

public class UnitTestGenerator
{
    public static string GenerateUnitTest(string code, string className, string methodName)
    {
        SyntaxTree tree = CSharpSyntaxTree.ParseText(code);
        CompilationUnitSyntax root = tree.GetCompilationUnitRoot();

        ClassDeclarationSyntax classDeclaration = root.DescendantNodes().OfType<ClassDeclarationSyntax>()
            .FirstOrDefault(c => c.Identifier.Text == className);

        if (classDeclaration == null)
        {
            return "Class not found.";
        }

        MethodDeclarationSyntax methodDeclaration = classDeclaration.DescendantNodes().OfType<MethodDeclarationSyntax>()
            .FirstOrDefault(m => m.Identifier.Text == methodName);

        if (methodDeclaration == null)
        {
            return "Method not found.";
        }

        string testClassName = $"{className}Tests";
        string testMethodName = $"{methodName}Test";

        string unitTestCode = $@"
public class {testClassName}
{{
    {GenerateArrangeSection(methodDeclaration)}
}}";

        return unitTestCode;
    }

    private static string GenerateArrangeSection(MethodDeclarationSyntax methodDeclaration)
    {
        string arrangeCode = "";
        var parameters = methodDeclaration.ParameterList.Parameters;

        var theoryAttribute = methodDeclaration.AttributeLists
            .SelectMany(al => al.Attributes)
            .FirstOrDefault(a => a.Name.ToString() == "Theory");

        if (theoryAttribute != null)
        {
            var inlineDataAttributes = methodDeclaration.AttributeLists
                .SelectMany(al => al.Attributes)
                .Where(a => a.Name.ToString() == "InlineData")
                .ToList();

            if (inlineDataAttributes.Any())
            {
                for (int i = 0; i < inlineDataAttributes.Count; i++)
                {
                    var inlineData = inlineDataAttributes[i];
                    var arguments = inlineData.ArgumentList.Arguments;

                    string testMethodName = $"{methodDeclaration.Identifier.Text}Test_{i}";

                    string testCaseCode = $@"
    [Fact]
    public void {testMethodName}()
    {{
        // Arrange
        ";

                    List<string> parameterNames = new List<string>();
                    List<string> argumentValues = new List<string>();

                    for (int j = 0; j < parameters.Count; j++)
                    {
                        parameterNames.Add(parameters[j].Identifier.Text);
                        if (j < arguments.Count)
                        {
                            var argument = arguments[j];
                            argumentValues.Add(argument.ToString());
                            testCaseCode += $"var {parameters[j].Identifier.Text} = {argument.ToString()};\n";
                        }
                        else
                        {
                            testCaseCode += $"var {parameters[j].Identifier.Text} = {GenerateTestData(parameters[j].Type)};\n";
                        }

                    }

                    testCaseCode += $@"

        // Act
        {GenerateActSection(GetClassName(methodDeclaration), methodDeclaration.Identifier.Text, methodDeclaration)}

        // Assert
        {GenerateAssertSection(methodDeclaration, argumentValues.LastOrDefault(), parameterNames, arguments.Count)} 
    }}";
                    arrangeCode += testCaseCode;
                }
                return arrangeCode;
            }
        }

        foreach (var parameter in parameters)
        {
            arrangeCode += $"var {parameter.Identifier.Text} = {GenerateTestData(parameter.Type)};\n";
        }

        string singleTestMethod = $@"
    [Fact]
    public void {methodDeclaration.Identifier.Text}Test()
    {{
        // Arrange
        {arrangeCode}

        // Act
        {GenerateActSection(GetClassName(methodDeclaration), methodDeclaration.Identifier.Text, methodDeclaration)}

        // Assert
        {GenerateAssertSection(methodDeclaration, null, null, 0)} 
    }}";

        return singleTestMethod;
    }


    private static string GenerateTestData(TypeSyntax type)
    {
        string typeName = type.ToString();

        switch (typeName)
        {
            case "int":
                return "10";
            case "string":
                return "\"TestString\"";
            case "bool":
                return "true";
            case "double":
                return "3.14";
            case "DateTime":
                return "DateTime.Now";
            default:
                if (typeName.EndsWith("[]"))
                {
                    string elementType = typeName.Substring(0, typeName.Length - 2);
                    return $"new {elementType}[] {{ {GenerateTestData(SyntaxFactory.ParseTypeName(elementType))} }}";
                }
                return "null";
        }
    }

    private static string GenerateActSection(string className, string methodName, MethodDeclarationSyntax methodDeclaration)
    {
        string actCode = "";
        string parameters = string.Join(", ", methodDeclaration.ParameterList.Parameters.Select(p => p.Identifier.Text));

        var classDeclaration = methodDeclaration.Parent as ClassDeclarationSyntax;

        if (classDeclaration != null)
        {
            if (methodDeclaration.ReturnType.ToString() != "void")
            {
                actCode = $"var result = new {classDeclaration.Identifier.Text}().{methodName}({parameters});\n";
            }
            else
            {
                actCode = $"new {classDeclaration.Identifier.Text}().{methodName}({parameters});\n";
            }
        }
        else
        {
            actCode = "// Error: Could not determine class name.\n";
        }

        return actCode;
    }

    private static string GenerateAssertSection(MethodDeclarationSyntax methodDeclaration, string expectedValue, List<string> parameterNames, int argumentCount)
    {
        string assertCode = "";

        if (methodDeclaration.ReturnType.ToString() != "void")
        {
            if (expectedValue != null)
            {
                assertCode = $"Assert.Equal({expectedValue}, result);";
            }
            else
            {
                var returnValueType = methodDeclaration.ReturnType.ToString();

                // Check if the return type is an array
                if (returnValueType.EndsWith("[]"))
                {
                    assertCode = $"Assert.True(result.SequenceEqual(new {returnValueType.Substring(0, returnValueType.Length - 2)}[] {{ {GenerateExpectedArrayValues(parameterNames,argumentCount,returnValueType)} }}));";
                }
                else
                {
                   expectedValue = GetExpectedValue(methodDeclaration.ReturnType);
                   assertCode = $"Assert.Equal({expectedValue}, result);";
                }
            }

        }

        return assertCode;
    }

    private static string GenerateExpectedArrayValues(List<string> parameterNames, int argumentCount, string returnValueType)
    {
        string expectedValues = "";

        // Example logic (replace with your actual logic to calculate expected array values)
        if (argumentCount > 0)
        {
            if (returnValueType == "int[]")
            {
                expectedValues = "2, 4, 6"; // Example values
            }
            else if (returnValueType == "string[]")
            {
                expectedValues = "\"Value1\", \"Value2\""; // Example values
            }
            // Add more types as needed
        }

        return expectedValues;
    }

    private static string GetExpectedValue(TypeSyntax returnType)
    {
        string typeName = returnType.ToString();
        switch (typeName)
        {
            case "int":
                return "15";
            case "string":
                return "\"Expected String\"";
            case "bool":
                return "true";
            case "double":
                return "6.28";
            case "DateTime":
                return "DateTime.Now";
            default:
                return "null";
        }
    }

    private static string GetClassName(MethodDeclarationSyntax methodDeclaration)
    {
        var parent = methodDeclaration.Parent;
        while (parent != null && !(parent is ClassDeclarationSyntax))
        {
            parent = parent.Parent;
        }

        if (parent is ClassDeclarationSyntax classDeclaration)
        {
            return classDeclaration.Identifier.Text;
        }

        return null;
    }

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
