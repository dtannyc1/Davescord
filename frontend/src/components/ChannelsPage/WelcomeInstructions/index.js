import './WelcomeInstructions.css';

const WelcomeInstructions = () => {
    return (
        <div className="welcome-instructions">
            <div className="welcome-instructions-inner">
                <div className="welcome-header">
                    <h1>Welcome to Davescord!</h1>
                    <p>Here's how to get started exploring this Discord clone</p>
                </div>

                <div className="instructions-section-1" >
                    <div className="instructions-section">
                        <h2>Navigating Servers</h2>
                        <ul>
                            <li>Click on server icons in the left sidebar to join different servers</li>
                            <li>Each server has multiple channels - click on channel names to view messages</li>
                            <li>Type messages in the text box at the bottom to chat with other server members</li>
                            <li>You can create new servers with the "+" button in the left sidebar</li>
                        </ul>
                    </div>

                    <div className="instructions-section">
                        <h2>Friends & Direct Messages</h2>
                        <ul>
                            <li>You're currently in the Direct Messages area (the Davescord icon at the top)</li>
                            <li>View your friends list and send friend requests here</li>
                            <li>Click on a friend to start a private chat conversation</li>
                            <li>Your private chats will appear in the left sidebar for easy access</li>
                        </ul>
                    </div>
                </div>

                <div className="instructions-section demo-section">
                    <h2>Testing Real-time Features</h2>
                    <p><strong>To see the websocket magic in action:</strong></p>
                    <ol>
                        <li>Open this website in a second browser or incognito window</li>
                        <li>Login as the other demo user using the demo login button</li>
                        <li>Now you can send messages, friend requests, and see real-time updates between both accounts!</li>
                    </ol>
                </div>

                <div className="instructions-footer">
                    <p>Tip: Demo data is refreshed monthly, so feel free to experiment and explore all features!</p>
                </div>

                <div className='welcome-spacer' style={{height: "2rem"}}></div>
            </div>
        </div>
    );
};

export default WelcomeInstructions;
