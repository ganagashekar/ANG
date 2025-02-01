using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Xunit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

public class UnitTestGenerator
{
    // ... (Other methods remain the same)

    private static string GenerateActSection(string className, string methodName, MethodDeclarationSyntax methodDeclaration)
    {
        string actCode = "";
        string parameters = string.Join(", ", methodDeclaration.ParameterList.Parameters.Select(p => p.Identifier.Text));

        var classDeclaration = methodDeclaration.Parent as ClassDeclarationSyntax;

        if (classDeclaration != null)
        {
            // Check for interface parameters and add mocking
            foreach (var parameter in methodDeclaration.ParameterList.Parameters)
            {
                if (parameter.Type is IdentifierNameSyntax interfaceType && IsInterface(interfaceType.Identifier.Text)) // Check if it's an interface
                {
                    actCode += $"var mock{parameter.Identifier.Text} = new Moq.Mock<{interfaceType.Identifier.Text}>();\n"; // Moq mocking
                    // Set up any necessary mock behavior (example)
                    // actCode += $"mock{parameter.Identifier.Text}.Setup(x => x.SomeMethod()).Returns(someValue);\n";
                    parameters = parameters.Replace(parameter.Identifier.Text, $"mock{parameter.Identifier.Text}.Object"); // Use the mock object
                }
            }

            if (methodDeclaration.ReturnType.ToString() != "void")
            {
                actCode += $"var result = new {classDeclaration.Identifier.Text}().{methodName}({parameters});\n";
            }
            else
            {
                actCode += $"new {classDeclaration.Identifier.Text}().{methodName}({parameters});\n";
            }
        }
        else
        {
            actCode = "// Error: Could not determine class name.\n";
        }

        return actCode;
    }

    private static bool IsInterface(string typeName)
    {
        // Basic check (you might want to use Roslyn's semantic model for more accurate checking)
        return typeName.StartsWith("I"); // Common convention
    }

    // ... (Other methods remain the same)

    public static void Main(string[] args)
    {
        string code = @"
public interface IDataService
{
    string GetData();
}

public class MyService
{
    private readonly IDataService _dataService;

    public MyService(IDataService dataService)
    {
        _dataService = dataService;
    }

    public string ProcessData()
    {
        string data = _dataService.GetData();
        return data.ToUpper();
    }

    public void LogData(IDataService dataService)
    {
        string data = dataService.GetData();
        // ... logging logic
    }
}
";

        string className = "MyService";
        string methodName = "ProcessData";

        string unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);

        string filePath = Path.Combine(Directory.GetCurrentDirectory(), $"{className}Tests.cs");
        File.WriteAllText(filePath, unitTest);
        Console.WriteLine($"Unit tests saved to: {filePath}");

        methodName = "LogData";
        unitTest = GenerateUnitTest(code, className, methodName);
        Console.WriteLine(unitTest);

        filePath = Path.Combine(Directory.GetCurrentDirectory(), $"{className}Tests.cs");
        File.AppendAllText(filePath, unitTest);
        Console.WriteLine($"Unit tests saved to: {filePath}");

    }
}
