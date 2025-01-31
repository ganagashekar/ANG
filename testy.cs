using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;

public class SemanticModelMethodProperties
{
    public static void FindMethodProperties(SemanticModel semanticModel, MethodDeclarationSyntax methodDeclaration)
    {
        Console.WriteLine($"Method Name: {methodDeclaration.Identifier}");
        Console.WriteLine($"Return Type: {methodDeclaration.ReturnType}");
        Console.WriteLine($"Modifiers: {string.Join(" ", methodDeclaration.Modifiers.Select(m => m.ToString()))}");

        Console.WriteLine("Parameters:");
        foreach (ParameterSyntax parameter in methodDeclaration.ParameterList.Parameters)
        {
            Console.WriteLine($"  - Name: {parameter.Identifier}, Type: {parameter.Type}");
        }

        // Get the Symbol for the method (this is where the semantic information is)
        IMethodSymbol methodSymbol = semanticModel.GetDeclaredSymbol(methodDeclaration);

        if (methodSymbol != null)
        {
            Console.WriteLine("Semantic Properties:");
            Console.WriteLine($"  - IsStatic: {methodSymbol.IsStatic}");
            Console.WriteLine($"  - IsAbstract: {methodSymbol.IsAbstract}");
            Console.WriteLine($"  - IsVirtual: {methodSymbol.IsVirtual}");
            Console.WriteLine($"  - IsOverride: {methodSymbol.IsOverride}");
            Console.WriteLine($"  - IsSealed: {methodSymbol.IsSealed}");
            // ... other properties you might be interested in ...

            // Accessing the containing type:
            ITypeSymbol containingType = methodSymbol.ContainingType;
            if (containingType != null)
            {
                Console.WriteLine($"  - Containing Type: {containingType.Name}");
                Console.WriteLine($"  - Containing Type Kind: {containingType.TypeKind}");

                // Example: Check if the containing type is a class
                if (containingType.TypeKind == TypeKind.Class)
                {
                    IClassSymbol classSymbol = containingType as IClassSymbol;
                    if (classSymbol != null) {
                        Console.WriteLine($"  - Base Type: {classSymbol.BaseType?.Name}"); // Check for null before accessing properties
                        // Access class properties like constructors, interfaces, etc.
                        foreach (var constructor in classSymbol.Constructors)
                        {
                            Console.WriteLine($"      Constructor: {constructor}");
                        }

                    }
                }
            }


            // Example: Get attributes
            foreach (AttributeData attribute in methodSymbol.GetAttributes())
            {
                Console.WriteLine($"  - Attribute: {attribute.AttributeClass?.Name}");
                // You can access attribute arguments here if needed
            }
        }
        else
        {
            Console.WriteLine("Could not retrieve semantic information for the method.");
        }
    }


    public static void Main(string[] args)
    {
        string sourceCode = @"
            using System;

            namespace MyNamespace
            {
                public class MyClass : MyBaseClass
                {
                    [Obsolete(""This method is obsolete."")]
                    public virtual int MyMethod(int x, string y)
                    {
                        return x + y.Length;
                    }

                    public MyClass(int value) {
                        _value = value;
                    }

                    private int _value;

                }

                public class MyBaseClass {

                }
            }";

        SyntaxTree tree = CSharpSyntaxTree.ParseText(sourceCode);
        CompilationUnitSyntax root = tree.GetCompilationUnitRoot();

        var compilation = CSharpCompilation.Create("MyCompilation", new[] { tree },
            new[] { MetadataReference.CreateFromFile(typeof(object).Assembly.Location) });

        SemanticModel semanticModel = compilation.GetSemanticModel(tree);

        // Find the method you want to analyze (e.g., by name)
        MethodDeclarationSyntax myMethod = root.DescendantNodes().OfType<MethodDeclarationSyntax>()
            .FirstOrDefault(m => m.Identifier.ToString() == "MyMethod");

        if (myMethod != null)
        {
            FindMethodProperties(semanticModel, myMethod);
        }
        else
        {
            Console.WriteLine("Method 'MyMethod' not found.");
        }
    }
}
