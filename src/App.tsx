import { useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Footer } from './components/Footer';
import { useChat } from './hooks/useChat';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    chats,
    activeChat,
    isTyping,
    isDeleting, // Добавляем состояние удаления
    createNewChat,
    sendMessage,
    deleteChat,
    setActiveChat,
    getCurrentChat,
  } = useChat();

  const currentChat = getCurrentChat();

  const handleStartChat = () => {
    createNewChat();
    setSidebarOpen(false);
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId);
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-green-900/10 to-transparent pointer-events-none" />
      
      {/* Fixed Navigation Bar - показывается только когда есть активный чат */}
      {currentChat && (
        <div className="flex-shrink-0">
          <NavigationBar />
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Show sidebar only when there are chats */}
        {chats.length > 0 && (
          <>
            {/* Mobile Overlay с плавной анимацией */}
            <div 
              className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
                sidebarOpen 
                  ? 'opacity-100 backdrop-blur-sm bg-black/50' 
                  : 'opacity-0 pointer-events-none bg-black/0'
              }`}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Fixed Sidebar с плавной анимацией */}
            <div className={`
              lg:block lg:flex-shrink-0
              ${sidebarOpen 
                ? 'fixed inset-y-0 left-0 z-50 transform translate-x-0' 
                : 'fixed inset-y-0 left-0 z-50 transform -translate-x-full lg:relative lg:translate-x-0'
              }
              transition-transform duration-300 ease-out
            `}>
              <div className="h-full">
                <Sidebar
                  chats={chats}
                  activeChat={activeChat}
                  isDeleting={isDeleting} // Передаем состояние удаления
                  onCreateChat={createNewChat}
                  onSelectChat={handleSelectChat}
                  onDeleteChat={deleteChat}
                />
              </div>
            </div>
          </>
        )}
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          {currentChat ? (
            <ChatInterface
              chat={currentChat}
              isTyping={isTyping}
              onSendMessage={sendMessage}
              sidebarOpen={sidebarOpen}
              onToggleSidebar={chats.length > 0 ? () => setSidebarOpen(!sidebarOpen) : undefined}
            />
          ) : (
            <WelcomeScreen onStartChat={handleStartChat} />
          )}
        </div>
      </div>
      
      {/* Fixed Footer */}
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
}

export default App;