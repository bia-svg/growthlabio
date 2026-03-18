import { useState, useRef } from "react";
import { Upload, FileText, Globe, X, Plus, Lightbulb, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ContextFile {
  id: string;
  name: string;
  type: "file" | "url";
  size?: string;
  url?: string;
  status: "uploaded" | "processing" | "ready";
}

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

let fileId = 0;
const genId = () => `ctx-${++fileId}`;

const OnboardingContext = ({ onContinue, onBack }: Props) => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("pt") ? "pt" : "en";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<ContextFile[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlField, setShowUrlField] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const newFiles: ContextFile[] = Array.from(selected).map((f) => ({
      id: genId(),
      name: f.name,
      type: "file" as const,
      size: formatSize(f.size),
      status: "processing" as const,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate processing
    newFiles.forEach((nf) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) => (f.id === nf.id ? { ...f, status: "ready" } : f))
        );
      }, 1200 + Math.random() * 800);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    const newFile: ContextFile = {
      id: genId(),
      name: trimmed,
      type: "url",
      url: trimmed,
      status: "processing",
    };

    setFiles((prev) => [...prev, newFile]);
    setUrlInput("");
    setShowUrlField(false);

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.id === newFile.id ? { ...f, status: "ready" } : f))
      );
    }, 1500);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleContinue = () => {
    const contextItems = files.map((f) => ({
      name: f.name,
      type: f.type,
      url: f.url,
    }));
    localStorage.setItem("gl_ai_context", JSON.stringify(contextItems));
    onContinue();
  };

  const readyCount = files.filter((f) => f.status === "ready").length;

  return (
    <div className="max-w-[720px] mx-auto px-6 py-10 dash-page-enter">
      <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[hsl(var(--dash-text-primary))] mb-2">
        {lang === "pt" ? "Contexto para a IA" : "AI Context"}
      </h2>
      <p className="text-[14px] text-[hsl(var(--dash-text-tertiary))] mb-8">
        {lang === "pt"
          ? "Suba arquivos ou adicione URLs do seu negócio para que a IA entenda seu contexto e gere insights mais precisos."
          : "Upload files or add URLs about your business so the AI understands your context and generates more accurate insights."}
      </p>

      {/* AI Tip */}
      <div className="flex items-start gap-3 bg-[hsl(var(--dash-blue-bg))] border border-[hsl(var(--dash-blue))]/20 rounded-lg px-4 py-3 mb-8">
        <Lightbulb className="w-4 h-4 text-[hsl(var(--dash-blue))] mt-0.5 shrink-0" />
        <div>
          <p className="text-[13px] font-medium text-[hsl(var(--dash-blue))] mb-0.5">
            {lang === "pt" ? "Quanto mais contexto, melhor" : "More context, better results"}
          </p>
          <p className="text-[12px] text-[hsl(var(--dash-blue))]/80">
            {lang === "pt"
              ? "Suba documentos como pitch decks, personas, playbooks, briefs de marca, landing pages ou qualquer material que ajude a IA a entender seu negócio."
              : "Upload documents like pitch decks, personas, playbooks, brand briefs, landing pages, or any material that helps the AI understand your business."}
          </p>
        </div>
      </div>

      {/* Suggested types */}
      <div className="mb-6">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))] mb-3">
          {lang === "pt" ? "Sugestões do que enviar" : "Suggested uploads"}
        </div>
        <div className="flex flex-wrap gap-2">
          {(lang === "pt"
            ? ["Pitch Deck", "Persona / ICP", "Playbook de vendas", "Brand guidelines", "Landing page URL", "Planilha de produtos", "Briefing criativo"]
            : ["Pitch Deck", "Persona / ICP", "Sales Playbook", "Brand guidelines", "Landing page URL", "Product spreadsheet", "Creative brief"]
          ).map((s) => (
            <span
              key={s}
              className="px-3 py-1.5 rounded-full border border-[hsl(var(--dash-border))] text-[12px] text-[hsl(var(--dash-text-tertiary))]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Upload area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-[hsl(var(--dash-border))] rounded-xl p-8 text-center cursor-pointer hover:border-[hsl(var(--dash-text-tertiary))] hover:bg-[hsl(var(--dash-sidebar))] transition-colors mb-4"
      >
        <Upload className="w-8 h-8 text-[hsl(var(--dash-text-tertiary))] mx-auto mb-3" />
        <p className="text-[14px] font-medium text-[hsl(var(--dash-text-primary))] mb-1">
          {lang === "pt" ? "Arraste arquivos ou clique para enviar" : "Drag files or click to upload"}
        </p>
        <p className="text-[12px] text-[hsl(var(--dash-text-tertiary))]">
          PDF, DOCX, PPTX, CSV, TXT, PNG, JPG — {lang === "pt" ? "até 20MB por arquivo" : "up to 20MB per file"}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.pptx,.csv,.txt,.png,.jpg,.jpeg,.xlsx,.md"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Add URL button */}
      {!showUrlField ? (
        <button
          onClick={() => setShowUrlField(true)}
          className="flex items-center gap-2 text-[13px] font-medium text-[hsl(var(--dash-text-secondary))] hover:text-[hsl(var(--dash-text-primary))] transition-colors mb-6"
        >
          <Globe className="w-4 h-4" />
          {lang === "pt" ? "Adicionar URL de um site ou página" : "Add a website or page URL"}
        </button>
      ) : (
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 flex items-center gap-2 border border-[hsl(var(--dash-border))] rounded-lg px-3 py-2">
            <Globe className="w-4 h-4 text-[hsl(var(--dash-text-tertiary))] shrink-0" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addUrl()}
              placeholder="https://..."
              className="flex-1 bg-transparent text-[13px] text-[hsl(var(--dash-text-primary))] placeholder:text-[hsl(var(--dash-text-tertiary))] focus:outline-none"
              autoFocus
            />
          </div>
          <button
            onClick={addUrl}
            disabled={!urlInput.trim()}
            className="h-9 px-4 bg-primary text-primary-foreground rounded-lg text-[12px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            {lang === "pt" ? "Adicionar" : "Add"}
          </button>
          <button
            onClick={() => { setShowUrlField(false); setUrlInput(""); }}
            className="text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Files list */}
      {files.length > 0 && (
        <div className="border border-[hsl(var(--dash-border))] rounded-xl overflow-hidden mb-8">
          <div className="px-5 py-3 border-b border-[hsl(var(--dash-border))] bg-[hsl(var(--dash-sidebar))]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))]">
                {lang === "pt" ? "Arquivos enviados" : "Uploaded files"} ({files.length})
              </span>
              {readyCount > 0 && (
                <span className="text-[11px] font-semibold text-[hsl(var(--dash-green))]">
                  {readyCount} {lang === "pt" ? "processados" : "processed"}
                </span>
              )}
            </div>
          </div>
          <div className="divide-y divide-[hsl(var(--dash-border))]">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 px-5 py-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  file.type === "url"
                    ? "bg-[hsl(var(--dash-blue-bg))]"
                    : "bg-[hsl(var(--dash-sidebar))]"
                }`}>
                  {file.type === "url" ? (
                    <Globe className="w-4 h-4 text-[hsl(var(--dash-blue))]" />
                  ) : (
                    <FileText className="w-4 h-4 text-[hsl(var(--dash-text-tertiary))]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[hsl(var(--dash-text-primary))] truncate">
                    {file.name}
                  </div>
                  {file.size && (
                    <div className="text-[11px] text-[hsl(var(--dash-text-tertiary))]">{file.size}</div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {file.status === "processing" ? (
                    <span className="text-[11px] text-[hsl(var(--dash-amber))] font-medium animate-pulse">
                      {lang === "pt" ? "Processando..." : "Processing..."}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-[hsl(var(--dash-green))] font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {lang === "pt" ? "Pronto" : "Ready"}
                    </span>
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-red))] transition-colors p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {files.length === 0 && (
        <div className="text-center py-6 mb-4">
          <p className="text-[13px] text-[hsl(var(--dash-text-tertiary))]">
            {lang === "pt"
              ? "Nenhum arquivo adicionado ainda. Isso é opcional — você pode fazer isso depois."
              : "No files added yet. This is optional — you can do this later."}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-[hsl(var(--dash-border))]">
        <button
          onClick={onBack}
          className="text-[13px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))]"
        >
          {lang === "pt" ? "← Voltar" : "← Back"}
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleContinue}
            className="text-[12px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))]"
          >
            {lang === "pt" ? "Pular por agora" : "Skip for now"}
          </button>
          <button
            onClick={handleContinue}
            className="h-[44px] px-6 bg-primary text-primary-foreground rounded-lg text-[14px] font-semibold hover:opacity-90 transition-opacity"
          >
            {lang === "pt" ? "Continuar →" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
};

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default OnboardingContext;
