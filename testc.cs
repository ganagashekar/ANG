using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;

public class SemanticModelToCSFile
{
    public static string GenerateCSCode(SemanticModel semanticModel, SyntaxNode root)
    {
        // 1. Get the compilation
        CSharpCompilation compilation = semanticModel.Compilation;

        // 2. Start building the code
        var code = new System.Text.StringBuilder();

        // 3. Handle namespaces
        NamespaceDeclarationSyntax namespaceDeclaration = root.DescendantNodes().OfType<NamespaceDeclarationSyntax>().FirstOrDefault();
        if (namespaceDeclaration != null)
        {
            code.AppendLine($"namespace {namespaceDeclaration.Name}");
            code.AppendLine("{");
        }


        // 4. Handle classes (and structs, etc.)
        ClassDeclarationSyntax classDeclaration = root.DescendantNodes().OfType<ClassDeclarationSyntax>().FirstOrDefault();
        if (classDeclaration != null)
        {
            code.AppendLine($"\tpublic class {classDeclaration.Identifier}"); // Basic class declaration. Add modifiers as needed.
            code.AppendLine("\t{");

            // 5. Handle fields
            foreach (FieldDeclarationSyntax fieldDeclaration in classDeclaration.DescendantNodes().OfType<FieldDeclarationSyntax>())
            {
                foreach (VariableDeclaratorSyntax variable in fieldDeclaration.Declaration.Variables)
                {
                    string typeName = fieldDeclaration.Declaration.Type.ToString();  // Get the type name
                    string fieldName = variable.Identifier.ToString();
                    string modifiers = string.Join(" ", fieldDeclaration.Modifiers.Select(m => m.ToString())); // Get modifiers (public, private, etc.)

                    code.AppendLine($"\t\t{modifiers} {typeName} {fieldName};");
                }
            }

            // 6. Handle methods
            foreach (MethodDeclarationSyntax methodDeclaration in classDeclaration.DescendantNodes().OfType<MethodDeclarationSyntax>())
            {
                string returnType = methodDeclaration.ReturnType.ToString();
                string methodName = methodDeclaration.Identifier.ToString();
                string modifiers = string.Join(" ", methodDeclaration.Modifiers.Select(m => m.ToString()));
                string parameters = string.Join(", ", methodDeclaration.ParameterList.Parameters.Select(p => $"{p.Type} {p.Identifier}"));

                code.AppendLine($"\t\t{modifiers} {returnType} {methodName}({parameters})");
                code.AppendLine("\t\t{");

                //  Handle method body (this is VERY simplified. You'll need more logic here)
                //  For now, just add a placeholder comment.
                code.AppendLine("\t\t\t// Method body goes here...");

                code.AppendLine("\t\t}");
            }


            code.AppendLine("\t}");
        }

        if (namespaceDeclaration != null)
        {
            code.AppendLine("}");
        }

        return code.ToString();
    }



    public static void Main(string[] args)
    {
        string sourceCode = @"
            using System;

            namespace MyNamespace
            {
                public class MyClass
                {
                    private int myField;
                    public string Name;

                    public void MyMethod(int x, string y)
                    {
                        // Some code here...
                        Console.WriteLine(x + y.Length);
                    }

                    public int Add(int a, int b) {
                      return a + b;
                    }
                }
            }";


        SyntaxTree tree = CSharpSyntaxTree.ParseText(sourceCode);
        CompilationUnitSyntax root = tree.GetCompilationUnitRoot();

        var compilation = CSharpCompilation.Create("MyCompilation", new[] { tree },
            new[] { MetadataReference.CreateFromFile(typeof(object).Assembly.Location) }); // Add necessary references

        SemanticModel semanticModel = compilation.GetSemanticModel(tree);



        string generatedCode = GenerateCSCode(semanticModel, root);
        Console.WriteLine(generatedCode);

        // To save to a file:
        // System.IO.File.WriteAllText("GeneratedFile.cs", generatedCode);

    }
}
