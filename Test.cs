//using Microsoft.CodeAnalysis;
//using Microsoft.CodeAnalysis.CSharp;
//using Microsoft.CodeAnalysis.CSharp.Syntax;
//using System.Collections.Generic;
//using System.Linq;
//using Microsoft.CodeAnalysis.FindSymbols;



//public static class MethodAnalyzer
//{
//    public static List<string> GetMethodParameterReferences(SemanticModel semanticModel, SyntaxNode root, string methodName, string parameterName)
//    {
//        var methodDeclaration = root.DescendantNodes()
//            .OfType<MethodDeclarationSyntax>()
//            .FirstOrDefault(m => m.Identifier.Text == methodName);

//        if (methodDeclaration == null)
//        {
//            return new List<string>();
//        }

//        var parameter = methodDeclaration.ParameterList.Parameters
//            .FirstOrDefault(p => p.Identifier.Text == parameterName);

//        if (parameter == null)
//        {
//            return new List<string>();
//        }

//        var parameterSymbol = semanticModel.GetDeclaredSymbol(parameter);

//        //var references = semanticModel.LookupSymbols(parameterSymbol)
//        //    .Select(r => r.GetSyntax())
//        //    .OfType<IdentifierNameSyntax>() // Filter for IdentifierNameSyntax
//        //    .Select(i => i.AncestorsAndSelf().OfType<MethodDeclarationSyntax>().FirstOrDefault())
//        //    .Where(m => m != null && m.Identifier.Text == methodName)
//        //    .Select(m => m.ToFullString())
//        //    .ToList();

//        return new List<string>();
//    }

//}



//public class Example
//{
//    public void MyMethod(MyClass obj)
//    {
//        obj.SomeMethod();
//    }

//    public void AnotherMethod(MyClass obj)
//    {
//        obj.AnotherMethod();
//    }

//    public class MyClass
//    {
//        public void SomeMethod() { }
//        public void AnotherMethod() { }
//    }
//}

//public class Program
//{
//    public static void Main(string[] args)
//    {
//        string sourceCode = @"
//using System;

//" + typeof(Example).ToString() + @"

//public class Program
//{
//    public static void Main(string[] args)
//    {
//        Example example = new Example();
//        example.MyMethod(new Example.MyClass()); 
//    }
//}";

//        SyntaxTree syntaxTree = CSharpSyntaxTree.ParseText(sourceCode);
//        SyntaxNode root = syntaxTree.GetRoot();

//        string methodName = "MyMethod";
//        string parameterName = "obj";

//        var referencedMethods = MethodAnalyzer.GetMethodParameterReferences(root, methodName, parameterName);

//        Console.WriteLine($"Methods referencing parameter '{parameterName}' in method '{methodName}':");
//        foreach (var method in referencedMethods)
//        {
//            Console.WriteLine(method);
//        }
//    }
//}


using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.FindSymbols;
using Microsoft.CodeAnalysis.MSBuild;
using Microsoft.CSharp;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.Text;
using System.Xml.Linq;
//using System.Web.Razor;

namespace TranslationSniffer
{


    class Program
    {
        public static string GetProjectType(string projectFilePath)
        {
            try
            {
                // Load the project file
                XDocument projectDoc = XDocument.Load(projectFilePath);

                // Get the OutputType element
                string outputType = projectDoc.Root.Element("PropertyGroup").Element("OutputType")?.Value;

                // Determine project type based on OutputType
                switch (outputType)
                {
                    case "Exe":
                        return "Console";
                    case "Library":
                        return "Library";
                    case "WinExe":
                        return "Windows Forms";
                    case "WebApplication":
                        return "Web Application";
                    default:
                        return "Unknown";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting project type: {ex.Message}");
                return "Unknown";
            }
        }
        public static List<string> GetProjectDependencies(string projectFilePath)
        {
            List<string> dependencies = new List<string>();

            try
            {
                // Load the project file
                XDocument projectDoc = XDocument.Load(projectFilePath);

                // Find all ProjectReference elements
                var projectReferences = projectDoc.Descendants("ProjectReference");

                // Extract the Include attribute (which contains the relative path to the dependency)
                foreach (var reference in projectReferences)
                {
                    string includePath = reference.Attribute("Include").Value;
                    dependencies.Add(includePath);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting project dependencies: {ex.Message}");
            }

            return dependencies;
        }
        static void Main(string[] args)
        {

            string solutionRoot = @"C:\Ganga\Code\Stock\";
            string sln = solutionRoot + "STM_API.sln";
            var wsb = MSBuildWorkspace.Create();
            // Load the solution, and find all the cshtml Razor views...
            var solution =  wsb.OpenSolutionAsync(sln).Result;

            var solutionwithallprojects= solution.Projects;

            foreach(var item in solutionwithallprojects)
            {
                Console.WriteLine($"{item.Name}");
                var projectreferences = item.ProjectReferences;
                if (projectreferences.Any())
                {
                    Console.WriteLine(projectreferences.ToList().Select(x => x.ProjectId));
                    GetProjectType(item.FilePath);
                }
            }
            return;
            var mainProj = solution.Projects.Where(x => x.Name == "ConsoleApp1").Single();
            var mscorlib = MetadataReference.CreateFromFile(typeof(object).Assembly.Location);



            return;
            FileInfo[] cshtmls = new DirectoryInfo(solutionRoot).GetFiles("*.cs", SearchOption.AllDirectories);
            foreach(var file in cshtmls)
            {
                var csFilePath = file;
                var csFileContent = File.ReadAllText(file.FullName);
                SyntaxTree tree = CSharpSyntaxTree.ParseText(csFileContent);
                var sourceText1 = SourceText.From(csFileContent);
                //NamespaceDeclarationSyntax nds = null;

                var ws1 = new AdhocWorkspace();
                //Create new solution
                var solId1 = SolutionId.CreateNewId();
                var solutionInfo1 = SolutionInfo.Create(solId1, VersionStamp.Create());
                //Create new project
                var project1 = ws1.AddProject("Sample", "C#");
                project1 = project1.AddMetadataReference(mscorlib);
                //Add project to workspace
                ws1.TryApplyChanges(mainProj.Solution);
                var doc1 = ws1.AddDocument(project1.Id, "NewDoc", sourceText1);
                //Get the semantic model
                var model1 = doc1.GetSemanticModelAsync().Result;

                var datata = doc1.GetSyntaxRootAsync().Result.DescendantNodes();

                var methodSyntax = datata.OfType<MethodDeclarationSyntax>().FirstOrDefault(m => m.Identifier.Text == "Main"); ;
                var methodlistdata = methodSyntax.DescendantNodes().ToList();
                foreach ( var method in methodlistdata)
                {
                    if (method.Kind().ToString() == "PredefinedType") continue;
                    var classSymbol = model1.GetDeclaredSymbol(method.DescendantNodes().OfType<ClassDeclarationSyntax>().First());
                }

                var methodInvocation1 = doc1.GetSyntaxRootAsync().Result.DescendantNodes().OfType<IdentifierNameSyntax>().First();
                var methodSymbol1 = model1.GetSymbolInfo(methodInvocation1).Symbol;
                //.OfType<ArgumentListSyntax>();
                datata.OfType<InitializerExpressionSyntax>();
                //Get the syntax node for the first invocation to M()
                //var methodInvocation1 = doc1.GetSyntaxRootAsync().Result.DescendantNodes().OfType<InvocationExpressionSyntax>().First();
                //var methodSymbol1 = model1.GetSymbolInfo(methodInvocation1).Symbol;
                //Finds all references to M()

                //var referencesToM1 = SymbolFinder.FindReferencesAsync(methodSymbol1, doc1.Project.Solution).Result;


            }

           // var mscorlib = MetadataReference.CreateFromFile(typeof(object).Assembly.Location);
            var ws = new AdhocWorkspace();
            //Create new solution
            var solId = SolutionId.CreateNewId();
            var solutionInfo = SolutionInfo.Create(solId, VersionStamp.Create());
            //Create new project
            var project = ws.AddProject("Sample", "C#");
            project = project.AddMetadataReference(mscorlib);
            //Add project to workspace
            ws.TryApplyChanges(project.Solution);
            string text = @"
class C
{
    void M()
    {
        M();
        M();
    }
}";
            var sourceText = SourceText.From(text);
            //Create new document
            var doc = ws.AddDocument(project.Id, "NewDoc", sourceText);
            //Get the semantic model
            var model = doc.GetSemanticModelAsync().Result;
            //Get the syntax node for the first invocation to M()
            var methodInvocation = doc.GetSyntaxRootAsync().Result.DescendantNodes().OfType<InvocationExpressionSyntax>().First();
            var methodSymbol = model.GetSymbolInfo(methodInvocation).Symbol;
            //Finds all references to M()
            var referencesToM = SymbolFinder.FindReferencesAsync(methodSymbol, doc.Project.Solution).Result;

            //            var tree = CSharpSyntaxTree.ParseText(@"
            //	public class MyClass {
            //			 int Method1(Test t) { return 0; }
            //			 void Method2()
            //			 {
            //				int x = Method1(new Test());
            //			 }
            //		}
            //	}
            //public class Test {
            //public string ABC {set;get;}
            //}

            //");

            //            var Mscorlib = MetadataReference.CreateFromFile(typeof(object).Assembly.Location);
            //            var compilation = CSharpCompilation.Create("MyCompilation",
            //                syntaxTrees: new[] { tree }, references: new[] { Mscorlib });
            //            var model = compilation.GetSemanticModel(tree);

            //            //Looking at the first method symbol
            //            var methodSyntax = tree.GetRoot().DescendantNodes().OfType<MethodDeclarationSyntax>().First();
            //            var methodSymbol = model.GetDeclaredSymbol(methodSyntax);

            //            Console.WriteLine(methodSymbol.ToString());         //MyClass.Method1()
            //            Console.WriteLine(methodSymbol.ContainingSymbol);   //MyClass
            //            Console.WriteLine(methodSymbol.IsAbstract);         //false

            //            //Looking at the first invocation
            //            var invocationSyntax = tree.GetRoot().DescendantNodes().OfType<InvocationExpressionSyntax>().First();
            //            var invokedSymbol = model.GetSymbolInfo(invocationSyntax).Symbol; //Same as MyClass.Method1

            //            Console.WriteLine(invokedSymbol.ToString());         //MyClass.Method1()
            //            Console.WriteLine(invokedSymbol.ContainingSymbol);   //MyClass
            //            Console.WriteLine(invokedSymbol.IsAbstract);         //false

            //            Console.WriteLine(invokedSymbol.Equals(methodSymbol)); //true
        }

        //public async Task Go()
        //{
        //    // Roslyn!
        //    var ws = MSBuildWorkspace.Create();

        //    // Store the translation keys...
        //    List<string> used = new List<string>();
        //    List<string> delete = new List<string>();

        //    string solutionRoot = @"C:\_Code\PathToProject\";
        //    string sln = solutionRoot + "MySolution.sln";

        //    // Load the solution, and find all the cshtml Razor views...
        //    var solution = await ws.OpenSolutionAsync(sln);
        //    var mainProj = solution.Projects.Where(x => x.Name == "ConsumerWeb").Single();
        //    FileInfo[] cshtmls = new DirectoryInfo(solutionRoot).GetFiles("*.cshtml", SearchOption.AllDirectories);

        //    // Go through each Razor View - generate the equivalent CS and add to the project for compilation.
        //    //var host = new RazorEngineHost(RazorCodeLanguage.Languages["cshtml"]);
        //    //var razor = new RazorTemplateEngine(host);
        //    //var cs = new CSharpCodeProvider();
        //    //var csOptions = new CodeGeneratorOptions();
        //    //foreach (var cshtml in cshtmls)
        //    //{
        //    //    using (StreamReader re = new StreamReader(cshtml.FullName))
        //    //    {
        //    //        try
        //    //        {
        //    //            // Let Razor do it's thang...
        //    //            var compileUnit = razor.GenerateCode(re).GeneratedCode;

        //    //            // Pull the code into a stringbuilder, and append to the main project:
        //    //            StringBuilder sb = new StringBuilder();
        //    //            using (StringWriter rw = new StringWriter(sb))
        //    //            {
        //    //                cs.GenerateCodeFromCompileUnit(compileUnit, rw, csOptions);
        //    //            }

        //    //            // Get the new immutable project
        //    //            var doc = mainProj.AddDocument(cshtml.Name + ".cs", sb.ToString());
        //    //            mainProj = doc.Project;
        //    //        }
        //    //        catch (Exception ex)
        //    //        {
        //    //            Console.WriteLine("Compile fail for: {0}", cshtml.Name);
        //    //            // throw;
        //    //        }

        //    //        continue;
        //    //    }
        //    //}

        //    // We now have a new immutable solution, as we have changed the project instance...
        //    solution = mainProj.Solution;

        //    // Pull out our application translation list (its in a static class called 'CMS'):
        //    var mainCompile = await mainProj.GetCompilationAsync();
        //    var mainModel = mainCompile.GetTypeByMetadataName("Resources.CMS");
        //    var translations = mainModel.GetMembers().Where(x => x.Kind == SymbolKind.Property).ToList();

        //    foreach (var translation in translations)
        //    {
        //        var references = await SymbolFinder.FindReferencesAsync(translation, solution);

        //        if (!references.First().Locations.Any())
        //        {
        //            Console.WriteLine("{0} translation is not used!", translation.Name);
        //            delete.Add(translation.Name);
        //        }
        //        else
        //        {
        //            Console.WriteLine("{0} :in: {1}", translation.Name, references.First().Locations.First().Document.Name);
        //            used.Add(translation.Name);
        //        }
        //    }

        //    Console.WriteLine();
        //    Console.WriteLine("Used references {0}. Unused references: {1}", used.Count, delete.Count);

        //    return;
        //}
    }
}
