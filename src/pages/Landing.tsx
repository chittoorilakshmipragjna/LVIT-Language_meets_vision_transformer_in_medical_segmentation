import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Scan, 
  FileText, 
  Download, 
  Shield, 
  Zap,
  ArrowRight,
  Activity
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Medical Imaging</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Advanced Diagnostic
              <span className="block bg-gradient-to-r from-primary via-glow-intense to-primary bg-clip-text text-transparent">
                Image Analysis
              </span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Revolutionize medical imaging analysis with AI. Upload X-rays and CT scans, 
              receive instant AI-powered analysis with precise disease localization and 
              detailed diagnostic reports.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="shadow-glow-intense group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose <span className="text-primary">MedAI Scan</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge artificial intelligence meets clinical precision for 
              superior diagnostic support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur hover:border-primary/30 transition-all hover:shadow-glow">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">
                State-of-the-art deep learning models trained on millions of medical images 
                for accurate disease detection
              </p>
            </Card>

            <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur hover:border-primary/30 transition-all hover:shadow-glow">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                <Scan className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Precise Localization</h3>
              <p className="text-muted-foreground">
                Advanced segmentation highlights exact disease locations with color-coded 
                overlays on your medical images
              </p>
            </Card>

            <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur hover:border-primary/30 transition-all hover:shadow-glow">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
              <p className="text-muted-foreground">
                Comprehensive diagnostic reports generated automatically with clinical 
                insights and recommendations
              </p>
            </Card>

            <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur hover:border-primary/30 transition-all hover:shadow-glow">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Export to PDF</h3>
              <p className="text-muted-foreground">
                Download professional medical reports with annotated images ready 
                for patient records and consultations
              </p>
            </Card>

            <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur hover:border-primary/30 transition-all hover:shadow-glow">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security ensures patient data privacy and regulatory 
                compliance at all times
              </p>
            </Card>

            <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur hover:border-primary/30 transition-all hover:shadow-glow">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-muted-foreground">
                Get AI analysis results in seconds, not hours. Accelerate diagnosis 
                and improve patient outcomes
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and accurate medical imaging analysis in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Upload Images",
                description: "Upload X-ray or CT scan images along with patient information and clinical notes"
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our advanced AI instantly analyzes the images, detecting abnormalities and disease patterns"
              },
              {
                step: "03",
                title: "Get Results",
                description: "Review detailed reports with highlighted disease areas and download professional PDFs"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-primary">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-12">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]" />
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Diagnostic Workflow?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join leading radiologists and healthcare professionals using AI-powered 
                medical imaging analysis
              </p>
              <Link to="/auth">
                <Button size="lg" className="shadow-glow-intense">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-bold">MedAI Scan</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Advanced AI-powered medical imaging analysis platform for radiologists 
                and healthcare professionals.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/auth" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MedAI Scan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
