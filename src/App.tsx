import { marked } from "marked";
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const [mdText, setMdText] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  const handleMdTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMdText(e.target.value);
    console.log(e.target.value);
  };

  const generatePDF = () => {
    if (previewRef.current && mdText.trim()) {
      const options = {
        margin: 1,
        filename: 'markdown-document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf()
        .from(previewRef.current)
        .set(options)
        .save();
    }
  };
  return (
    <div className="h-[92vh]">
      <div className="py-4 px-16 flex flex-row justify-center h-[95%]">
        <textarea
          name=""
          id=""
          placeholder="sample text"
          className="p-3 rounded-lg border mr-4 w-1/2 no-scrollbar focus:outline-none"
          onChange={handleMdTextChange}
        ></textarea>
        <div className="w-1/2 h-full overflow-y-auto no-scrollbar rounded-lg border bg-transparent">
          <div
            ref={previewRef}
            className="html-content h-full bg-white"
            dangerouslySetInnerHTML={{ __html: marked.parse(mdText) }}
          />
        </div>
      </div>
      <div className="flex justify-center align-middle items-center">
        <button 
          onClick={generatePDF}
          disabled={!mdText.trim()}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default App;
