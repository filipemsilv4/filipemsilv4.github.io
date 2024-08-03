'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const content = `Olá! Me chamo Paulo e sou estudante de Ciência da Computação no IFNMG desde 2021. Sou apaixonado por programação competitiva e inteligência artificial.

Minhas habilidades incluem:
- lorem ipsum dolor sit amet
- consectetur adipiscing elit
- sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
- ut enim ad minim veniam
- quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat

duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.

Digite 'help' para ver os comandos disponíveis.`;

const githubLink = 'https://github.com/filipemsilv4';

export default function Terminal() {
  const [displayedContent, setDisplayedContent] = useState('');
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])

  useEffect(() => {
    let index = 0;
    let animationFrameId: number;
  
    const animate = () => {
      if (index < content.length) {
        setDisplayedContent(content.slice(0, index + 1));
        index++;
        animationFrameId = requestAnimationFrame(animate);
      }
    };
  
    animationFrameId = requestAnimationFrame(animate);
  
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processCommand(input)
    setInput('')
  }

  const processCommand = (cmd: string) => {
    switch (cmd.toLowerCase()) {
      case 'help':
        setOutput([...output, '> ' + cmd, 'Comandos disponíveis:', '- github: Abre meu perfil no GitHub', '- cv: Abre meu currículo em PDF', '- contato: Mostra meu e-mail de contato', '- clear: Limpa o terminal'])
        break
      case 'github':
        window.open(githubLink, '_blank')
        setOutput([...output, '> ' + cmd, 'Abrindo GitHub...'])
        break
      case 'cv':
        window.open('/resume.pdf', '_blank')
        setOutput([...output, '> ' + cmd, 'Abrindo currículo...'])
        break
      case 'contato':
        setOutput([...output, '> ' + cmd, 'E-mail: contato@paulofilipe.com'])
        break
      case 'clear':
        setOutput([])
        break
      default:
        setOutput([...output, '> ' + cmd, 'Comando não reconhecido. Digite "help" para ver os comandos disponíveis.'])
    }
  }

  return (
    <div className="terminal">
      <pre>{displayedContent}</pre>
      <div className="output">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <span className="prompt">$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          autoFocus
        />
      </form>
      <div className="links">
        <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">Currículo</Link>
        <Link href={githubLink} target="_blank" rel="noopener noreferrer">GitHub</Link>
        <Link href="mailto:contato@paulofilipe.com">Contato</Link>
      </div>
    </div>
  )
}