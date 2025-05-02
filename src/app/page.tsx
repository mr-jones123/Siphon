import { Search, BookOpen, Database, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


// import { ProtectedPageLink } from "@/components/auth/ProtectedPageLink"



export default function Home() {

  return (
    <div className="min-h-screen">
      {/* Header with Auth */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h2 className="font-mono font-semibold text-xl">Siphon</h2>
      </div>
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="font-mono font-semibold text-6xl md:text-9xl">Siphon</h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            Make your research invincible
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">How Siphon Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-transparent border border-black">
            <CardHeader>
              <Search className="h-8 w-8 mb-2" />
              <CardTitle>Intelligent Search</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Enter your research title or topic, and Siphon will understand the context and key concepts of your
                research area.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-transparent border border-black">
            <CardHeader>
              <Database className="h-8 w-8 mb-2" />
              <CardTitle>Web Crawling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Siphon crawls scholarly websites, digital libraries, and academic databases to find the most relevant
                resources.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-transparent border border-black">
            <CardHeader>
              <BookOpen className="h-8 w-8 mb-2" />
              <CardTitle>Curated Results</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get a curated list of papers, journals, and resources ranked by relevance and academic impact.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-4 py-16 bg-transparent border border-black">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Simple 3-Step Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full border-2 border-black mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enter Research Title</h3>
            <p>Type in your research title or topic in the search field</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full border-2 border-black mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p>Siphon analyzes your topic and searches scholarly sources</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full border-2 border-black mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Resources</h3>
            <p>Review and access the top resources for your research paper</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to supercharge your research?</h2>
          <p className="text-xl mb-8">
            Build the foundations of your paper with Siphon.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="h-12 px-8">
              <Zap className="mr-2 h-5 w-5" /> Coming Soon
            </Button>
            {/* <ProtectedPageLink /> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container w-full mx-auto px-4 py-8 border-t border-black">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="font-mono text-xl">Siphon</p>
          <p className="text-sm">© {new Date().getFullYear()} Siphon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

