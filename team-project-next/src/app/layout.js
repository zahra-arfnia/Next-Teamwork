
import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <div className="container">
           <Header/>
           <div  className="content ">
            {children}
           </div>
        
        <Footer />
        </div>
       
      </body>
    </html>
  );
}
