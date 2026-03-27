import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useState } from "react";
import DemoModal from "@/components/DemoModal";

const Privacy = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <NavBar onOpenModal={() => setModalOpen(true)} />
      <DemoModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <main className="pt-[52px]">
        <div className="max-w-[760px] mx-auto px-7 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Política de Privacidade do Clarivus
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Última atualização: 27 de março de 2026
          </p>

          <div className="prose prose-neutral max-w-none text-foreground/90 space-y-6 text-[15px] leading-relaxed">
            <p>
              A <strong>METEORA DIGITAL PLATAFORMA DE ENSINO E TREINAMENTOS LTDA</strong> ("Meteora Digital", "nós", "nosso" ou "nossa") opera o aplicativo e serviço <strong>Clarivus</strong>. Esta Política de Privacidade descreve como coletamos, usamos, processamos e protegemos as suas informações ao utilizar o Clarivus, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei 13.709/2018) e demais normas aplicáveis.
            </p>
            <p>
              O Clarivus é uma plataforma de dashboard e copiloto de Inteligência Artificial projetada para atender times de marketing, receita e gestão, conectando contas de anúncio e sistemas de vendas para transformar dados em decisões de crescimento.
            </p>

            <Section title="1. Quais dados coletamos">
              <p>Para fornecer nossos serviços, coletamos informações diretamente de você e através de integrações com plataformas de terceiros que você autoriza:</p>

              <h3 className="text-base font-semibold mt-6 mb-2 text-foreground">1.1. Dados de Conta e Perfil</h3>
              <p>Ao criar uma conta no Clarivus, coletamos seu nome, endereço de e-mail, foto de perfil (quando aplicável) e, opcionalmente, seu número de telefone (WhatsApp) para fins de suporte e contato comercial.</p>

              <h3 className="text-base font-semibold mt-6 mb-2 text-foreground">1.2. Dados de Integrações (via OAuth)</h3>
              <p>Quando você conecta o Clarivus às suas plataformas de marketing e vendas, nós acessamos e processamos os seguintes dados, estritamente de acordo com as permissões concedidas:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Meta Ads (Facebook/Instagram):</strong> Solicitamos as permissões <code className="bg-muted px-1.5 py-0.5 rounded text-sm">ads_read</code> e <code className="bg-muted px-1.5 py-0.5 rounded text-sm">business_management</code>. Acessamos métricas a nível de campanha, incluindo gasto, impressões, cliques, ações/leads e custo por ação, além de identificadores de contas de anúncio.</li>
                <li><strong>Google Ads:</strong> Solicitamos o escopo de acesso para leitura de métricas de desempenho de campanhas, incluindo custo, impressões, cliques, conversões e valor de conversões.</li>
                <li><strong>Shopify:</strong> Solicitamos permissões de leitura (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">read_orders</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-sm">read_products</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-sm">read_customers</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-sm">read_reports</code>) para acessar dados agregados da loja, pedidos, produtos e clientes através da GraphQL Admin API.</li>
                <li><strong>Stripe:</strong> Utilizamos o Stripe Connect com permissão de leitura (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">read_only</code>) para acessar dados de cobranças, reembolsos e receita líquida. Armazenamos apenas o identificador da conta conectada, sem reter tokens de acesso.</li>
              </ul>

              <h3 className="text-base font-semibold mt-6 mb-2 text-foreground">1.3. Credenciais de Integração</h3>
              <p>Armazenamos tokens de acesso OAuth (quando aplicável) e identificadores de conta necessários para manter a conexão segura e contínua com as plataformas integradas. Os tokens são armazenados de forma segura em nosso banco de dados com acesso restrito.</p>

              <h3 className="text-base font-semibold mt-6 mb-2 text-foreground">1.4. Dados de Interação com a IA</h3>
              <p>Coletamos o histórico das suas conversas com nosso assistente virtual (AI Copilot) e com o assistente de onboarding, bem como as preferências de dashboard que você configura.</p>
            </Section>

            <Section title="2. Base legal para tratamento de dados (LGPD, Art. 7)">
              <p>O tratamento dos seus dados pessoais é realizado com base nas seguintes hipóteses legais previstas no Art. 7 da LGPD:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Consentimento (Art. 7, I):</strong> Ao criar sua conta e autorizar as integrações OAuth com plataformas de terceiros, você consente expressamente com a coleta e o tratamento dos dados descritos nesta política.</li>
                <li><strong>Execução de contrato (Art. 7, V):</strong> O tratamento de dados é necessário para a execução do contrato de prestação de serviços do Clarivus, incluindo a geração de dashboards e análises de IA.</li>
                <li><strong>Interesse legítimo (Art. 7, IX):</strong> Para fins de melhoria do serviço, segurança da plataforma e suporte técnico, desde que respeitados os direitos e liberdades fundamentais do titular.</li>
              </ul>
            </Section>

            <Section title="3. Como usamos os seus dados">
              <p>Os dados coletados são utilizados estritamente para as seguintes finalidades:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Geração de Dashboards:</strong> Exibir as métricas de desempenho consolidadas (gasto, cliques, impressões, leads, CPA, ROAS, receita) em um painel unificado.</li>
                <li><strong>Análise via AI Copilot:</strong> Alimentar nossa Inteligência Artificial para analisar a performance dos últimos 30 dias, detectar problemas, gerar alertas antecipados (Early Warning) e propor otimizações com justificativas baseadas no histórico da sua conta.</li>
                <li><strong>Melhoria do Serviço e Suporte:</strong> Otimizar a experiência do usuário, fornecer suporte técnico e enviar atualizações importantes sobre o sistema.</li>
              </ul>
              <p className="mt-4">
                Nós <strong>não</strong> utilizamos os dados das suas campanhas para treinar modelos de Inteligência Artificial genéricos ou públicos. A inteligência gerada a partir dos seus dados é isolada e aplicada exclusivamente para o benefício do seu próprio negócio (Workspace).
              </p>
            </Section>

            <Section title="4. Compartilhamento de Dados com Terceiros">
              <p>A Meteora Digital garante que os dados da sua conta de anúncios, métricas de performance e informações de clientes <strong>não são vendidos, alugados ou compartilhados com terceiros</strong> para fins de marketing ou publicidade.</p>
              <p className="mt-3">Podemos compartilhar informações apenas nas seguintes situações estritamente necessárias para a operação do Clarivus:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Provedores de Infraestrutura em Nuvem:</strong> Utilizamos serviços de banco de dados, autenticação e funções de backend, sujeitos a rigorosos acordos de confidencialidade e segurança.</li>
                <li><strong>Provedores de Inteligência Artificial:</strong> Para fornecer as funcionalidades do AI Copilot, enviamos as mensagens do chat e um resumo das métricas agregadas (dos últimos 30 dias) para provedores de modelos de linguagem de grande escala (LLMs). Estes provedores atuam apenas como processadores de dados e não têm permissão para usar seus dados para treinar seus próprios modelos.</li>
                <li><strong>Obrigação Legal:</strong> Quando exigido por lei, regulamentação ou ordem judicial válida.</li>
              </ul>
            </Section>

            <Section title="5. Direitos do Titular dos Dados (LGPD, Art. 18)">
              <p>Nos termos da LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Confirmação e acesso:</strong> Confirmar a existência de tratamento e obter acesso aos dados tratados.</li>
                <li><strong>Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
                <li><strong>Anonimização, bloqueio ou eliminação:</strong> Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD.</li>
                <li><strong>Portabilidade:</strong> Solicitar a portabilidade dos dados a outro fornecedor de serviço.</li>
                <li><strong>Eliminação:</strong> Solicitar a eliminação dos dados pessoais tratados com base no consentimento.</li>
                <li><strong>Revogação do consentimento:</strong> Revogar o consentimento a qualquer momento, sem comprometer a licitude do tratamento realizado anteriormente.</li>
                <li><strong>Informação sobre compartilhamento:</strong> Obter informação sobre as entidades públicas e privadas com as quais compartilhamos dados.</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento realizado com base em hipótese de dispensa de consentimento, em caso de descumprimento da LGPD.</li>
              </ul>
              <p className="mt-3">Para exercer qualquer um desses direitos, entre em contato pelo e-mail <strong>contato@meteoradigital.io</strong>.</p>
            </Section>

            <Section title="6. Retenção e Exclusão de Dados">
              <p>Nós retemos os dados de performance das suas campanhas e o histórico de chat apenas pelo tempo necessário para fornecer os serviços do Clarivus ou conforme exigido por obrigações legais.</p>
              <p className="mt-3">Em cumprimento ao Art. 15 do Marco Civil da Internet (Lei 12.965/2014), os registros de acesso à aplicação (endereço IP, data e hora) serão armazenados em ambiente seguro e controlado pelo prazo mínimo de 6 (seis) meses.</p>

              <h3 className="text-base font-semibold mt-6 mb-2 text-foreground">Como solicitar a exclusão dos seus dados</h3>
              <ol className="list-decimal pl-5 space-y-2 mt-2">
                <li><strong>Desconexão no Painel do Clarivus (Self-Service):</strong> Dentro do Clarivus, acesse a página de "Integrações" e clique em "Desconectar" na plataforma desejada. Isso removerá imediatamente os tokens de acesso e interromperá a coleta de novos dados.</li>
                <li><strong>Desconexão nas Plataformas Originais:</strong> Você pode remover o aplicativo Clarivus diretamente nas configurações de Integrações de Negócios da sua conta do Meta, Google, Shopify ou Stripe.</li>
                <li><strong>Exclusão Definitiva de Dados Históricos:</strong> A desconexão interrompe a coleta, mas preserva o histórico já armazenado para consultas futuras. Para solicitar a exclusão permanente de todos os dados (incluindo o cache de métricas e histórico de chat) armazenados nos nossos servidores, envie um e-mail para <strong>contato@meteoradigital.io</strong> com o assunto "Solicitação de Exclusão de Dados - Clarivus". Processaremos sua solicitação e excluiremos seus dados em até 7 dias úteis, conforme exigido pela LGPD.</li>
              </ol>
            </Section>

            <Section title="7. Segurança e Armazenamento">
              <p>Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Criptografia na transmissão de dados (HTTPS/TLS).</li>
                <li>Tokens de autenticação armazenados de forma segura em banco de dados com acesso restrito.</li>
                <li>Políticas de segurança a nível de linha (Row Level Security) garantindo que cada usuário acessa apenas os dados do seu próprio Workspace.</li>
                <li>Sessões de autenticação gerenciadas de forma segura pelo provedor de identidade.</li>
                <li>Backups automáticos com recuperação pontual (Point-in-Time Recovery).</li>
              </ul>
            </Section>

            <Section title="8. Encarregado de Proteção de Dados (DPO)">
              <p>Em conformidade com o Art. 41 da LGPD, o encarregado pelo tratamento de dados pessoais da Meteora Digital pode ser contatado pelo e-mail <strong>contato@meteoradigital.io</strong>.</p>
            </Section>

            <Section title="9. Alterações nesta Política">
              <p>Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas, integrações ou por razões operacionais e legais. Notificaremos você sobre quaisquer alterações significativas através do aplicativo Clarivus ou por e-mail.</p>
            </Section>

            <Section title="10. Contato">
              <p>Se você tiver dúvidas sobre esta Política de Privacidade, sobre os provedores terceirizados que utilizamos ou sobre como tratamos seus dados, entre em contato conosco:</p>
              <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border text-sm space-y-1">
                <p className="font-semibold">METEORA DIGITAL PLATAFORMA DE ENSINO E TREINAMENTOS LTDA</p>
                <p>CNPJ: 32.028.021/0001-01</p>
                <p>Endereço: Travessa Frei Ambrósio, 2134, Aparecida, Santarém - PA, CEP 68.040-125</p>
                <p>E-mail: contato@meteoradigital.io</p>
                <p>Site: https://meteoradigital.io/pt-br</p>
              </div>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="pt-4">
    <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
    {children}
  </section>
);

export default Privacy;
