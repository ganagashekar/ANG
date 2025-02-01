using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Xunit;
using System;
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
    [Fact]
    public void {testMethodName}()
    {{
        // Arrange
        {GenerateArrangeSection(methodDeclaration)}

        // Act
        {GenerateActSection(className, methodName, methodDeclaration)}

        // Assert
        {GenerateAssertSection(methodDeclaration)}
    }}
}}";

        return unitTestCode;
    }

    private static string GenerateArrangeSection(MethodDeclarationSyntax methodDeclaration)
    {
        string arrangeCode = "";
        foreach (var parameter in methodDeclaration.ParameterList.Parameters)
        {
            arrangeCode += $"var {parameter.Identifier.Text} = {GenerateTestData(parameter.Type)};\n";
        }
        return arrangeCode;
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
                return "null"; // Placeholder for custom types.  Need reflection or other methods.
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

    private static string GenerateAssertSection(MethodDeclarationSyntax methodDeclaration)
    {
        string assertCode = "";

        if (methodDeclaration.ReturnType.ToString() != "void")
        {
            string expectedValue = GetExpectedValue(methodDeclaration.ReturnType); // Placeholder!  Needs logic!
            assertCode = $"Assert.Equal({expectedValue}, result);"; // xUnit Assert.Equal
        }

        return assertCode;
    }

    private static string GetExpectedValue(TypeSyntax returnType)
    {
        string typeName = returnType.ToString();
        switch (typeName)
        {
            case "int":
                return "15"; // Example - NEEDS LOGIC TO CALCULATE!
            case "string":
                return "\"Expected String\""; // Example - NEEDS LOGIC TO CALCULATE!
            case "bool":
                return "true"; // Example - NEEDS LOGIC TO CALCULATE!
            case "double":
                return "6.28";
            case "DateTime":
                return "DateTime.Now";
            default:
                return "null"; // Placeholder
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

    public string Greet(string name)
    {
        return ""Hello, "" + name;
    }

    public int[] GetEvens(int limit)
    {
         return Enumerable.Range(1, limit).Where(x => x % 2 == 0).ToArray();
    }

    public void DoSomething()
    {
        // ...
    }
}
";

        string className = "Calculator";
        string methodName = "Add";

        string unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);

        methodName = "Greet";
        unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);

        methodName = "GetEvens";
        unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);


        methodName = "DoSomething";
        unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);
    }
}
