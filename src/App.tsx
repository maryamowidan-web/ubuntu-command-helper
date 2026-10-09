import React, { useState } from 'react';
import './App.css';

interface CommandItem {
  id: string;
  command: string;
  category: string;
  description: string;
  example: string;
}

const commandsData: CommandItem[] = [
  { id: '1', command: 'systemctl status', category: 'Services', description: 'Checks the detailed status of a systemd service in Ubuntu.', example: 'systemctl status nginx' },
  { id: '2', command: 'journalctl -u', category: 'Logs', description: 'Fetches system logs specifically for a given service unit.', example: 'journalctl -u docker.service -n 50' },
  { id: '3', command: 'ufw status', category: 'Security', description: 'Displays current Uncomplicated Firewall rules and state.', example: 'sudo ufw status verbose' },
  { id: '4', command: 'dpkg -l', category: 'Package Manager', description: 'Lists all installed Debian/Ubuntu packages on the system.', example: 'dpkg -l | grep python' },
  { id: '5', command: 'netstat -tulnp', category: 'Networking', description: 'Shows active listening network ports and running processes.', example: 'sudo netstat -tulnp' }
];

export const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Services', 'Logs', 'Security', 'Package Manager', 'Networking'];

  const filteredCommands = commandsData.filter(cmd => {
    const matchesSearch = cmd.command.toLowerCase().includes(search.toLowerCase()) || 
                          cmd.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <header className="header">
        <h1>Ubuntu Command & Service Helper</h1>
        <p>A lightweight developer reference tool for Linux sysadmin and Web deployment</p>
      </header>

      <div className="filter-bar">
        <input 
          type="text" 
          placeholder="Search commands or descriptions..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
        <div className="categories">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {filteredCommands.map(item => (
          <div key={item.id} className="card">
            <div className="card-header">
              <code>{item.command}</code>
              <span className="badge">{item.category}</span>
            </div>
            <p className="desc">{item.description}</p>
            <div className="example">
              <span className="ex-label">Example usage:</span>
              <pre>{item.example}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
