"use client"

import { useState } from "react"
import Desktop from "@/components/desktop"
import ProgramWindow from "@/components/program-window"
import { useWindowManager } from "@/hooks/use-window-manager"

export default function Home() {
  const { windows, openWindow, closeWindow, maximizeWindow, isMaximized, updateWindowPosition, getWindowPosition } =
    useWindowManager<{ id: string; title: string }>()

  return (
    <div className="font-mono bg-black text-green-500 min-h-screen p-4 overflow-hidden relative">
      <div className="border border-green-500 p-2 mb-4">

        <pre className="text-center">
  {String.raw`
 _____ ____________  ___   _____ _____           ______ _____ _____  _____ 
|  ___|___  /| ___ \/ _ \ /  ___/  ___|          |  _  \  _  /  __ \/  ___|
| |__    / / | |_/ / /_\ \\ \`--.\ \`--.   ______  | | | | | | | /  \/\ \`--. 
|  __|  / /  |  __/|  _  | \`--. \ \`--. \ |______| | | | | | | | |     \`--. \ 
| |___./ /___| |   | | | |/\__/ /\__/ /          | |/ /\ \_/ / \__/\/\__/ /
\____/\_____/\_|   \_| |_/\____/\____/           |___/  \___/ \____/\____/ 
                                                                           
                                                                            
`}
        </pre>
        <div className="text-center text-xs mt-2">v1.0.0 - Documentação</div>
      </div>

      <Desktop onOpenProgram={openWindow} />

      {windows.map((window) => (
        <ProgramWindow
          key={window.id}
          id={window.id}
          title={window.title}
          isMaximized={isMaximized(window.id)}
          onClose={() => closeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          position={getWindowPosition(window.id)}
          onPositionChange={updateWindowPosition}
        >
          {window.id === "ezpass-docs" && <ProgramDocumentation />}
          {window.id === "slint-docs" && <LanguageDocumentation />}
        </ProgramWindow>
      ))}
    </div>
  )
}

function ProgramDocumentation() {
  const [activeTab, setActiveTab] = useState("geral");

  return (
    <div className="h-full overflow-auto">
      <div className="flex border-b border-green-500">
        <TabButton active={activeTab === "geral"} onClick={() => setActiveTab("geral")}>
          Geral
        </TabButton>
        <TabButton active={activeTab === "utilização"} onClick={() => setActiveTab("utilização")}>
          Utilização
        </TabButton>
        <TabButton active={activeTab === "api"} onClick={() => setActiveTab("api")}>
          API WebSocket
        </TabButton>
        <TabButton active={activeTab === "histórico"} onClick={() => setActiveTab("histórico")}>
          Histórico de Commits
        </TabButton>
      </div>

      <div className="p-4">
        {activeTab === "geral" && (
          <div>
            <h2 className="text-xl mb-4">Geral</h2>
            <p className="mb-2">
              O <strong>EZPass</strong> é um gerenciador de senhas seguro e portátil, projetado para armazenar, gerenciar e preencher automaticamente credenciais de login em websites. Ele utiliza criptografia robusta, um banco de dados SQLite, e comunicação via WebSocket para integração com extensões de navegador, oferecendo uma experiência de usuário fluida e segura.
            </p>
            <h3 className="text-lg mt-4 mb-2">Propósito do Programa</h3>
            <p className="mb-2">
              O EZPass foi desenvolvido para:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1">Armazenar senhas com segurança usando Argon2 e criptografia simétrica.</li>
              <li className="mb-1">Preencher automaticamente credenciais em websites via WebSocket.</li>
              <li className="mb-1">Gerenciar bancos de dados com suporte a chaves mestras.</li>
              <li className="mb-1">Oferecer uma interface gráfica intuitiva com Slint.</li>
              <li className="mb-1">Suportar Windows, Linux e macOS com portabilidade total.</li>
            </ul>
            <p className="mb-2">
              O programa é ideal para usuários que desejam uma solução local para gerenciar senhas, garantindo maior controle e privacidade.
            </p>
            <h3 className="text-lg mt-4 mb-2">Estrutura do Programa</h3>
            <p className="mb-2">
              O EZPass é dividido da seguinte maneira:
            </p>
            <pre className="border border-green-500 p-2 my-4">
              {`
+---------------------------+
|                           |
|  Estrutura do Programa    |
|                           |
+---------------------------+
|                           |
|  - Interface              |
|  - Criptografia           |
|  - Gerenciamento de       |
|    Arquivos               |
|  - WebSocket              |
|                           |
+---------------------------+
              `}
            </pre>
            <h4 className="text-md mt-4 mb-2">Interface</h4>
            <p className="mb-2">
              Utiliza Slint para uma interface gráfica responsiva, com janelas para login, gerenciamento de senhas, importação/exportação de bancos de dados e configuração de inicialização automática.
            </p>
            <h4 className="text-md mt-4 mb-2">Criptografia</h4>
            <p className="mb-2">
              Usa Argon2 para hash de senhas, criptografia simétrica para senhas armazenadas, e chaves mestras (.masterkey) para autenticação alternativa.
            </p>
            <h4 className="text-md mt-4 mb-2">Gerenciamento de Arquivos</h4>
            <p className="mb-2">
              Armazena dados em SQLite com tabelas para usuários, senhas, preferências de campos e configurações de websites. Um arquivo config.json gerencia bancos de dados registrados.
            </p>
            <h4 className="text-md mt-4 mb-2">WebSocket</h4>
            <p className="mb-2">
              Um servidor WebSocket (127.0.0.1:9001) integra-se com extensões de navegador, processando mensagens para autopreenchimento e salvamento de credenciais.
            </p>
            <h3 className="text-lg mt-4 mb-2">Como Funciona</h3>
            <ol className="list-decimal pl-6 mb-4">
              <li className="mb-1"><strong>Autenticação</strong>: Login com usuário/senha ou chave mestra, verificado por Argon2.</li>
              <li className="mb-1"><strong>Gerenciamento de Senhas</strong>: Adição, edição e exclusão de senhas via interface gráfica.</li>
              <li className="mb-1"><strong>Autopreenchimento</strong>: Extensão do navegador consulta o WebSocket para preencher formulários.</li>
              <li className="mb-1"><strong>Importação/Exportação</strong>: Bancos de dados são importados/exportados com chaves mestras.</li>
              <li className="mb-1"><strong>Inicialização Automática</strong>: Configurável para iniciar com o sistema operacional.</li>
            </ol>
          </div>
        )}

        {activeTab === "utilização" && (
          <div>
            <h2 className="text-xl mb-4">Utilização</h2>
            <p className="mb-4">
              O EZPass é um programa portátil que não requer instalação. Basta executar o executável para começar a usá-lo. Abaixo estão as instruções para as principais funcionalidades:
            </p>
            <h3 className="text-lg mt-4 mb-2">Instruções Básicas</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1"><strong>Ativar o WebSocket</strong>: Na interface, ative o servidor WebSocket para integração com a extensão do navegador.</li>
              <li className="mb-1"><strong>Gerenciar Senhas</strong>: Use a interface gráfica para adicionar, editar ou excluir senhas. Importe/exporte bancos de dados através dos botões correspondentes.</li>
            </ul>
            <h3 className="text-lg mt-4 mb-2">Casos de Uso Comuns</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1"><strong>Armazenamento de Senhas</strong>: Adicione credenciais para websites frequentemente acessados.</li>
              <li className="mb-1"><strong>Autopreenchimento</strong>: Configure seletores de campos para que a extensão preencha formulários automaticamente.</li>
              <li className="mb-1"><strong>Recuperação de Senhas</strong>: Use a chave mestra para acessar o banco de dados caso a senha seja esquecida.</li>
              <li className="mb-1"><strong>Gerenciamento Multiplataforma</strong>: Exporte bancos de dados para uso em diferentes dispositivos.</li>
            </ul>
            <h3 className="text-lg mt-4 mb-2">Notas Adicionais</h3>
            <p className="mb-2">
              - A extensão do navegador deve estar configurada para se conectar ao WebSocket em <code>127.0.0.1:9001</code>.<br />
              - Armazene a chave mestra em um local seguro, pois ela é necessária para recuperação de acesso.
            </p>
          </div>
        )}

        {activeTab === "api" && (
          <div>
            <h2 className="text-xl mb-4">Referência da API WebSocket</h2>
            <p className="mb-4">
              O servidor WebSocket do EZPass, aberto em <code>127.0.0.1:9001</code>, expõe os seguintes endpoints para integração com extensões de navegador:
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-green-500">
                  <th className="text-left p-2">Mensagem</th>
                  <th className="text-left p-2">Descrição</th>
                  <th className="text-left p-2">Formato</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-green-500">
                  <td className="p-2">GET_FIELD</td>
                  <td className="p-2">Recupera credenciais para um website e função (username/password).</td>
                  <td className="p-2"><code>GET_FIELD:example.com\|password</code></td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2">ADD_PASSWORD</td>
                  <td className="p-2">Adiciona uma nova senha com seletores.</td>
                  <td className="p-2"><code>ADD_PASSWORD\|example.com\|user\|pass\|#user\|#pass</code></td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2">PREF</td>
                  <td className="p-2">Define preferências de campo para um website.</td>
                  <td className="p-2"><code>PREF:example.com\|#password\|Password</code></td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2">SET_WEBSITE_PREF</td>
                  <td className="p-2">Define se senhas podem ser salvas para um website.</td>
                  <td className="p-2"><code>SET_WEBSITE_PREF:example.com\|1</code></td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2">Website</td>
                  <td className="p-2">Recupera todas as credenciais para um website.</td>
                  <td className="p-2"><code>example.com</code></td>
                </tr>
              </tbody>
            </table>
            <h3 className="text-lg mt-4 mb-2">Exemplo de Resposta JSON</h3>
            <pre className="border border-green-500 p-2 my-4">
              {`
{
  "password": "mypassword",
  "username_email": "user@example.com",
  "preferences": [
    {"selector": "#username", "role": "Username"},
    {"selector": "#password", "role": "Password"}
  ],
  "save_allowed": true,
  "error": null,
  "multiple_accounts": null
}
              `}
            </pre>
          </div>
        )}

        {activeTab === "histórico" && (
          <div>
            <h2 className="text-xl mb-4">Histórico de Commits</h2>
            <p className="mb-4">
              O desenvolvimento do EZPass foi conduzido por <strong>Ecztassy</strong>, com commits entre Março e Abril de 2025. Abaixo está o resumo das principais mudanças:
            </p>
            <h3 className="text-lg mt-4 mb-2">2 de Abril de 2025</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1"><strong>linux stuff</strong>: Ajustes para suporte e compatibilidade com Linux.</li>
              <li className="mb-1"><strong>Update Cargo.toml</strong>: Atualizações nas dependências.</li>
              <li className="mb-1"><strong>Merge pull request #1 from Ecztassy/optimizations</strong>: Integração de otimizações.</li>
            </ul>
            <h3 className="text-lg mt-4 mb-2">1 de Abril de 2025</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1"><strong>Update Cargo.toml</strong>: Ajustes adicionais nas dependências.</li>
              <li className="mb-1"><strong>Update main.rs</strong>: Melhorias no código principal.</li>
            </ul>
            <h3 className="text-lg mt-4 mb-2">31 de Março de 2025</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1"><strong>Update main.rs</strong> (múltiplos): Refatorações e melhorias no código.</li>
            </ul>
            <h3 className="text-lg mt-4 mb-2">24 de Março de 2025</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1"><strong>Delete .github/workflows directory</strong>: Remoção de configurações obsoletas de CI/CD.</li>
              <li className="mb-1"><strong>Create build.yml</strong>: Nova configuração para builds.</li>
            </ul>
            <h3 className="text-lg mt-4 mb-2">23 de Março de 2025</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1"><strong>Delete .github/workflows/build.yml</strong>: Remoção de configuração anterior.</li>
              <li className="mb-1"><strong>Update build.yml</strong> (múltiplos): Iterações na configuração de build.</li>
              <li className="mb-1"><strong>Create build.yml</strong>: Nova configuração de build.</li>
              <li className="mb-1"><strong>final version (password editing by extension)</strong>: Edição de senhas via extensão.</li>
              <li className="mb-1"><strong>Delete ui/poppins directory, poppins directory</strong>: Remoção de fontes desnecessárias.</li>
              <li className="mb-1"><strong>Delete app.db</strong>: Remoção de banco de dados de teste.</li>
              <li className="mb-1"><strong>Delete src/ui.rs, src/mod.rs, src/backend.rs</strong>: Refatoração do código.</li>
              <li className="mb-1"><strong>final version</strong> (múltiplos): Finalização da versão estável.</li>
            </ul>
            <h3 className="text-lg mt-4 mb-2">20 de Março de 2025</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1"><strong>encryption</strong>: Implementação do sistema de criptografia.</li>
              <li className="mb-1"><strong>logout, startup fn</strong>: Funcionalidades de logout e inicialização automática.</li>
            </ul>
            <h3 className="text-lg mt-4 mb-2">14 de Março de 2025</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1"><strong>websocket passing info</strong>: Passagem de informações via WebSocket.</li>
            </ul>
            <h3 className="text-lg mt-4 mb-2">11 de Março de 2025</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1"><strong>Fill e Websocket</strong>: Desenvolvimento inicial do autopreenchimento e WebSocket.</li>
              <li className="mb-1"><strong>otimizacao save file</strong>: Otimizações no salvamento de arquivos.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function LanguageDocumentation() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="h-full overflow-auto">
      <div className="flex border-b border-green-500">
        <TabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
          Visão Geral
        </TabButton>
        <TabButton active={activeTab === "components"} onClick={() => setActiveTab("components")}>
          Componentes
        </TabButton>
        <TabButton active={activeTab === "properties"} onClick={() => setActiveTab("properties")}>
          Propriedades
        </TabButton>
        <TabButton active={activeTab === "callbacks"} onClick={() => setActiveTab("callbacks")}>
          Callbacks
        </TabButton>
        <TabButton active={activeTab === "examples"} onClick={() => setActiveTab("examples")}>
          Exemplos
        </TabButton>
      </div>

      <div className="p-4">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl mb-4">Visão Geral do Slint</h2>
            <p className="mb-4">
              Slint é uma linguagem declarativa para construir interfaces de usuário nativas. Foi criada para ser:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1">Declarativa - Descreve o que a UI deve ser, não como construí-la</li>
              <li className="mb-1">Componentizada - Baseada em componentes reutilizáveis</li>
              <li className="mb-1">Multiplataforma - Compila para várias plataformas nativas</li>
              <li className="mb-1">Integrável - Pode ser usada com várias linguagens de programação</li>
            </ul>
            
            <h3 className="text-lg mt-4 mb-2">História e Contexto</h3>
            <p className="mb-4">
              O Slint foi desenvolvido como parte do projeto SixtyFPS (agora Slint) para fornecer uma maneira moderna
              de criar interfaces de usuário performáticas e bonitas. Ele combina elementos de QML, HTML e outras
              linguagens declarativas com um sistema de tipos forte e compilação eficiente.
            </p>
            
            <h3 className="text-lg mt-4 mb-2">Características Principais</h3>
            <div className="border border-green-500 p-4 my-4">
              <h4 className="font-bold mb-2">Sistema de Componentes</h4>
              <p>Componentes são blocos de construção reutilizáveis que encapsulam UI e comportamento.</p>
              
              <h4 className="font-bold mt-3 mb-2">Propriedades e Bindings</h4>
              <p>Propriedades podem ser vinculadas para atualização automática da UI.</p>
              
              <h4 className="font-bold mt-3 mb-2">Estilização Integrada</h4>
              <p>Suporte nativo para estilos, temas e propriedades visuais.</p>
              
              <h4 className="font-bold mt-3 mb-2">Multiplataforma</h4>
              <p>Compila para Windows, Linux, macOS, WebAssembly e microcontroladores.</p>
            </div>
          </div>
        )}

        {activeTab === "components" && (
          <div>
            <h2 className="text-xl mb-4">Componentes no EzPass</h2>
            <p className="mb-4">Seu projeto utiliza vários componentes personalizados e padrão:</p>
            
            <h3 className="text-lg mt-4 mb-2">Componentes Personalizados</h3>
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="border-b border-green-500">
                  <th className="text-left p-2">Componente</th>
                  <th className="text-left p-2">Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">StyledButton</td>
                  <td className="p-2">Botão estilizado que herda do Button padrão</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">StyledButton1</td>
                  <td className="p-2">Botão personalizado com efeitos de hover/pressed</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">PasswordCard</td>
                  <td className="p-2">Cartão para exibir informações de senha</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">LoginWindow</td>
                  <td className="p-2">Janela de login principal</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">BlackSquareWindow</td>
                  <td className="p-2">Janela principal do gerenciador de senhas</td>
                </tr>
              </tbody>
            </table>
            
            <h3 className="text-lg mt-4 mb-2">Componentes Padrão Utilizados</h3>
            <div className="border border-green-500 p-4 my-4">
              <code>
                Button, LineEdit, ScrollView, Switch, Window, Rectangle,<br />
                VerticalLayout, HorizontalLayout, Image, Text, TouchArea
              </code>
            </div>
            
            <h3 className="text-lg mt-4 mb-2">Estrutura de um Componente</h3>
            <div className="border border-green-500 p-4 my-4">
              <pre>{`component NomeDoComponente inherits TipoBase {
  // Propriedades
  in property <tipo> nome;
  in-out property <tipo> nome;
  private property <tipo> nome;
  
  // Callbacks
  callback nome();
  
  // Layout e elementos filhos
  Rectangle {
    // Conteúdo do componente
  }
}`}</pre>
            </div>
          </div>
        )}

        {activeTab === "properties" && (
          <div>
            <h2 className="text-xl mb-4">Sistema de Propriedades</h2>
            <p className="mb-4">Slint usa propriedades para gerenciar estado e dados:</p>
            
            <h3 className="text-lg mt-4 mb-2">Tipos de Propriedades</h3>
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="border-b border-green-500">
                  <th className="text-left p-2">Tipo</th>
                  <th className="text-left p-2">Descrição</th>
                  <th className="text-left p-2">Exemplo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">in property</td>
                  <td className="p-2">Entrada (read-only)</td>
                  <td className="p-2 font-mono">in property &lt;string&gt; button-text</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">out property</td>
                  <td className="p-2">Saída (write-only)</td>
                  <td className="p-2 font-mono">out property &lt;int&gt; result</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">in-out property</td>
                  <td className="p-2">Bidirecional</td>
                  <td className="p-2 font-mono">in-out property &lt;string&gt; username</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">private property</td>
                  <td className="p-2">Uso interno</td>
                  <td className="p-2 font-mono">private property &lt;bool&gt; passwordVisible</td>
                </tr>
              </tbody>
            </table>
            
            <h3 className="text-lg mt-4 mb-2">Bindings de Propriedades</h3>
            <div className="border border-green-500 p-4 my-4">
              <pre>{`// Binding bidirecional
LineEdit { 
  text <=> root.username; 
}

// Binding unidirecional
Text {
  text: root.message;
}

// Binding condicional
Rectangle {
  background: root.passwordVisible ? red : green;
}`}</pre>
            </div>
            
            <h3 className="text-lg mt-4 mb-2">Propriedades no EzPass</h3>
            <div className="border border-green-500 p-4 my-4">
              <p>Principais propriedades utilizadas:</p>
              <ul className="list-disc pl-6 mt-2">
                <li className="mb-1"><span className="font-mono">password_entries</span> - Lista de entradas de senha</li>
                <li className="mb-1"><span className="font-mono">panelVisible</span> - Controle de visibilidade do painel</li>
                <li className="mb-1"><span className="font-mono">selected_*</span> - Propriedades para edição</li>
                <li className="mb-1"><span className="font-mono">isAddMode</span> - Modo de adição/edição</li>
                <li className="mb-1"><span className="font-mono">autostart_enabled</span> - Configuração de auto-início</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "callbacks" && (
          <div>
            <h2 className="text-xl mb-4">Callbacks e Interatividade</h2>
            <p className="mb-4">Callbacks permitem comunicação entre componentes e lógica externa:</p>
            
            <h3 className="text-lg mt-4 mb-2">Callbacks no EzPass</h3>
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="border-b border-green-500">
                  <th className="text-left p-2">Callback</th>
                  <th className="text-left p-2">Componente</th>
                  <th className="text-left p-2">Propósito</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">login-clicked</td>
                  <td className="p-2">LoginWindow</td>
                  <td className="p-2">Ação de login</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">register-clicked</td>
                  <td className="p-2">LoginWindow</td>
                  <td className="p-2">Ação de registro</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">edit-clicked</td>
                  <td className="p-2">PasswordCard</td>
                  <td className="p-2">Editar entrada</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">delete-clicked</td>
                  <td className="p-2">PasswordCard</td>
                  <td className="p-2">Excluir entrada</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">toggle_autostart</td>
                  <td className="p-2">BlackSquareWindow</td>
                  <td className="p-2">Configurar auto-início</td>
                </tr>
                <tr className="border-b border-green-500">
                  <td className="p-2 font-mono">websocket</td>
                  <td className="p-2">BlackSquareWindow</td>
                  <td className="p-2">Controlar suporte a extensão</td>
                </tr>
              </tbody>
            </table>
            
            <h3 className="text-lg mt-4 mb-2">Sistema de Eventos</h3>
            <div className="border border-green-500 p-4 my-4">
              <pre>{`// Exemplo de handler de clique
TouchArea {
  clicked => { 
    root.edit-clicked(root.id); 
  }
}

// Exemplo de toggle
Switch {
  checked <=> root.autostart_enabled;
  toggled => { root.toggle_autostart(root.autostart_enabled); }
}`}</pre>
            </div>
          </div>
        )}

        {activeTab === "examples" && (
          <div>
            <h2 className="text-xl mb-4">Exemplos do EzPass</h2>
            
            <h3 className="text-lg mt-4 mb-2">Componente Reutilizável</h3>
            <div className="border border-green-500 p-4 my-4">
              <pre>{`component StyledButton1 inherits Rectangle {
    in-out property <string> text;
    callback clicked;
    
    border-radius: self.height / 2;
    border-width: 1px;
    border-color: self.background.darker(25%);
    background: touch.pressed ? #6b828200 : touch.has-hover ? #6c616c00 : #0c86ff00;
    height: txt.preferred-height * 2;
    width: 300px;

    txt := Text {
        x: (parent.width - self.width) / 2 + (touch.pressed ? 2px : 0);
        y: (parent.height - self.height) / 2 + (touch.pressed ? 1px : 0);
        color: touch.pressed ? #ffffff : #eeeeee;
        font-size: 16px;
        text: root.text;
    }
    touch := TouchArea { clicked => { root.clicked(); } }
}`}</pre>
            </div>
            
            <h3 className="text-lg mt-4 mb-2">Lista Dinâmica</h3>
            <div className="border border-green-500 p-4 my-4">
              <pre>{`ScrollView {
    height: parent.height - header.height;
    width: 100%;
    VerticalLayout {
        padding: 5px;
        spacing: 10px;
        width: parent.width - 20px;
        for entry in root.password_entries: PasswordCard {
            id: entry.id;
            website: entry.website;
            username_email: entry.username_email;
            password: entry.password;
            edit-clicked(id) => {
                root.isAddMode = false;
                root.selected_website = entry.website;
                root.id = id;
                root.selected_username_email = entry.username_email;
                root.selected_password = entry.password;
                root.panelVisible = true;
            }
            delete-clicked(id) => { root.deletePassword(id); }
        }
    }
}`}</pre>
            </div>
            
            <h3 className="text-lg mt-4 mb-2">Condicionais e Estados</h3>
            <div className="border border-green-500 p-4 my-4">
              <pre>{`// Visibilidade condicional
Rectangle {
    visible: root.panelVisible;
    // conteúdo...
}

// Texto condicional
Text { 
    text: root.isAddMode ? "Add Password" : "Edit Password"; 
}

// Input type condicional
LineEdit { 
    input-type: root.passwordVisible ? InputType.text : InputType.password; 
}`}</pre>
            </div>
            
            <h3 className="text-lg mt-4 mb-2">Melhores Práticas</h3>
            <div className="border border-green-500 p-4 my-4">
              <ul className="list-disc pl-6">
                <li className="mb-1">Use componentes reutilizáveis (como StyledButton)</li>
                <li className="mb-1">Nomeie propriedades e callbacks de forma descritiva</li>
                <li className="mb-1">Organize o layout com Vertical/HorizontalLayout</li>
                <li className="mb-1">Use bindings para atualização automática da UI</li>
                <li className="mb-1">Documente componentes complexos com comentários</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TabButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      className={`px-4 py-2 ${active ? "bg-green-900 text-green-300" : "hover:bg-green-900/30"} transition-colors`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
