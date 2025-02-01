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

                    for (int j = 0; j < parameters.Count; j++)
                    {
                        if (j < arguments.Count)
                        {
                            var argument = arguments[j];
                            testCaseCode += $"var {parameters[j].Identifier.Text} = {argument.ToString()};\n";
                        }
                        else
                        {
                            testCaseCode += $"var {parameters[j].Identifier.Text} = {GenerateTestData(parameters[j].Type)};\n";
                        }

                    }

                    testCaseCode += $@"

        // Act
        {GenerateActSection(methodDeclaration.Parent.As<ClassDeclarationSyntax>().Identifier.Text, methodDeclaration.Identifier.Text, methodDeclaration)}

        // Assert
        {GenerateAssertSection(methodDeclaration, arguments.ElementAtOrDefault(parameters.Count - 1))} 
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
        {GenerateActSection(methodDeclaration.Parent.As<ClassDeclarationSyntax>().Identifier.Text, methodDeclaration.Identifier.Text, methodDeclaration)}

        // Assert
        {GenerateAssertSection(methodDeclaration, null)} 
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

        if (methodDeclaration.ReturnType.ToString() != "void")
        {
            actCode = $"var result = new {className}().{methodName}({parameters});\n";
        }
        else
        {
            actCode = $"new {className}().{methodName}({parameters});\n";
        }

        return actCode;
    }

    private static string GenerateAssertSection(MethodDeclarationSyntax methodDeclaration, ArgumentSyntax expectedValueArgument)
    {
        string assertCode = "";

        if (methodDeclaration.ReturnType.ToString() != "void")
        {
            string expectedValue = (expectedValueArgument != null) ? expectedValueArgument.ToString() : GetExpectedValue(methodDeclaration.ReturnType);
            assertCode = $"Assert.Equal({expectedValue}, result);";
        }

        return assertCode;
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

    public string Greet(string name)
    {
        return ""Hello, "" + name;
    }

    public void DoSomething()
    {
        // ...
    }
}
";

        string className = "Calculator";
        string methodName = "AddTheory";

        string unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);

        methodName = "Add";
        unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);


        methodName = "Greet";
        unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);

         methodName = "DoSomething";
        unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);


    }
}
