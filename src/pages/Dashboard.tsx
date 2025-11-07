import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Image as ImageIcon, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

export default function Dashboard() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [reportText, setReportText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Image uploaded successfully");
    }
  };

  const createMarkedImage = (originalImage: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          // Highlight diseased areas with semi-transparent red overlay
          ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
          
          // Highlight multiple areas (simulating AI detection)
          const areas = [
            { x: img.width * 0.30, y: img.height * 0.25, width: img.width * 0.15, height: img.height * 0.15 },
            { x: img.width * 0.28, y: img.height * 0.42, width: img.width * 0.12, height: img.height * 0.10 },
          ];
          
          areas.forEach(area => {
            ctx.fillRect(area.x, area.y, area.width, area.height);
          });
          
          resolve(canvas.toDataURL('image/png'));
        }
      };
      img.src = originalImage;
    });
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !reportText) {
      toast.error("Please upload an image and enter patient report");
      return;
    }

    setIsAnalyzing(true);
    
    // Create marked image with red circles
    const markedImage = await createMarkedImage(imagePreview);
    
    setTimeout(() => {
      setResults({
        maskedImage: markedImage,
        analysis: "AI Analysis: Opacity detected in the left upper lobe of the lung, measuring approximately 2.5cm. The lesion shows irregular borders and heterogeneous density, suggestive of possible pneumonia or early-stage malignancy. Additional small opacity noted in the left mid-zone. Recommendation: Follow-up CT scan in 3 months and clinical correlation advised.",
        confidence: 87,
        findings: [
          "Left upper lobe opacity detected",
          "Irregular borders with heterogeneous density",
          "Primary lesion size: approximately 2.5cm",
          "Secondary opacity in left mid-zone",
          "Pattern suggestive of inflammatory or neoplastic process"
        ]
      });
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 3000);
  };

  const handleDownloadReport = () => {
    if (!results) return;
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(0, 150, 136);
      pdf.text("Medical Imaging Analysis Report", pageWidth / 2, 20, { align: 'center' });
      
      // Date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 28, { align: 'center' });
      
      // Confidence Score
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Confidence Score: ${results.confidence}%`, 20, 40);
      
      // Original Image
      pdf.setFontSize(14);
      pdf.text("Original Image:", 20, 50);
      pdf.addImage(imagePreview, 'PNG', 20, 55, 80, 80);
      
      // Analyzed Image
      pdf.text("Analysis Result:", 110, 50);
      pdf.addImage(results.maskedImage, 'PNG', 110, 55, 80, 80);
      
      // Key Findings
      pdf.setFontSize(14);
      pdf.text("Key Findings:", 20, 145);
      pdf.setFontSize(11);
      let yPos = 155;
      results.findings.forEach((finding: string, idx: number) => {
        const lines = pdf.splitTextToSize(`${idx + 1}. ${finding}`, pageWidth - 40);
        pdf.text(lines, 20, yPos);
        yPos += lines.length * 6;
      });
      
      // Detailed Analysis
      pdf.setFontSize(14);
      pdf.text("Detailed Analysis:", 20, yPos + 10);
      pdf.setFontSize(11);
      const analysisLines = pdf.splitTextToSize(results.analysis, pageWidth - 40);
      pdf.text(analysisLines, 20, yPos + 20);
      
      // Disclaimer
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        "This report is AI-generated and should be reviewed by a qualified medical professional.",
        pageWidth / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
      
      // Save PDF
      pdf.save(`medical-analysis-${new Date().getTime()}.pdf`);
      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF report");
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analysis Dashboard</h1>
          <p className="text-muted-foreground">
            Upload medical images and patient reports for AI-powered analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Upload Medical Image
              </h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-12 w-12 text-primary/60" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload X-ray or CT scan
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports JPG, PNG (max 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Patient Report
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report">Clinical Notes</Label>
                  <Textarea
                    id="report"
                    placeholder="Enter patient symptoms, medical history, and clinical observations..."
                    className="min-h-[200px] border-primary/20"
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                  />
                </div>
                
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !selectedImage || !reportText}
                  className="w-full shadow-glow"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Results"
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Analysis Results</h2>
                    <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {results.confidence}% Confidence
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border border-primary/20">
                      <img
                        src={results.maskedImage}
                        alt="Analysis result"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                      <h3 className="font-semibold mb-2 text-destructive">Key Findings:</h3>
                      <ul className="space-y-1">
                        {results.findings.map((finding: string, idx: number) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-destructive mt-1">•</span>
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
                  <h3 className="font-semibold mb-3">Detailed Analysis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {results.analysis}
                  </p>
                  
                  <Button
                    onClick={handleDownloadReport}
                    className="w-full mt-6 shadow-glow"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF Report
                  </Button>
                </Card>
              </>
            ) : (
              <Card className="p-12 border-primary/10 bg-card/50 backdrop-blur text-center">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <ImageIcon className="h-16 w-16 opacity-20" />
                  <p>Upload an image and patient report to see analysis results</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
