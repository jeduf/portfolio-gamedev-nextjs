import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from '../styles/terminal.module.css';
import { navLinks } from "@/components/config";
import { useRouter } from 'next/router';


const Terminal = () => {
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState([]);
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleToggleTerminalEvent = () => {
            setIsTerminalOpen(!isTerminalOpen);
        };
        document.addEventListener('toggleTerminal', handleToggleTerminalEvent);
    }, []);

    useLayoutEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isTerminalOpen]);

    const handleSetOutput = (newOutput) => {
        //split newOutput by \n
        const newOutputArray = newOutput.split('\n');
        //add each element of the array to output
        newOutputArray.forEach((newOutput) => {
            setOutput((output) => [...output, newOutput]);
        }
        );
    };

    const handleInputChange = (event) => {
        setCommand(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            const [cmd, ...args] = command.split(' ');
            switch (cmd) {
                case 'cd':
                    handleCd(args);
                    break;
                case 'ls':
                    handleLs();
                    break;
                case 'help':
                    handleHelp(args);
                    break;
                case 'clear':
                    handleClear();
                    break;
                case 'exit':
                    handleExit();
                    break;
                default:
                    handleUnknownCommand(cmd);
                    handleSetOutput(`> ${command}`);
                    break;
            }
            setCommand('');
            setHistory((history) => [...history, command]);
            setHistoryIndex(history.length);
        }
        if (event.key === 'Tab') {
            event.preventDefault();
            const [cmd, ...args] = command.split(' ');
            switch (cmd) {
                case 'cd':
                    //fill page names in args
                    if (args.length > 0) {
                        const pageNames = navLinks.map((link) => link.name);
                        const filteredPageNames = pageNames.filter((pageName) => pageName.toLowerCase().startsWith(args[0].toLowerCase()));
                        if (filteredPageNames.length === 1) {
                            setCommand(`cd ${filteredPageNames[0].toLowerCase()}`);
                        }
                        else {
                            handleSetOutput(filteredPageNames.join(' '));
                        }
                    }
            }
        }
        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (history.length > 0) {
                if (historyIndex > 0) {
                    setHistoryIndex((historyIndex) => historyIndex - 1);
                }
                setCommand(history[historyIndex]);
            }
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            if (history.length > 0) {
                if (historyIndex < history.length - 1) {
                    setHistoryIndex((historyIndex) => historyIndex + 1);
                }
                setCommand(history[historyIndex]);
            }
        }
    };

    const handleCd = (args) => {
        // handle cd command
        if (args.length === 0) {
            handleSetOutput('cd: missing operand');
            return;
        }
        const [arg] = args;
        switch (arg) {
            case '..':
                window.location.href = '/';
                handleSetOutput('Going back to home page');
                break;
            case '-s':
                window.open(`https://www.google.com/search?q=${args.slice(1).join(' ')}`, '_blank');
                handleSetOutput(`Searching google for ${args.slice(1).join(' ')}`)
                break;
            case '-y':
                window.open(`https://www.youtube.com/results?search_query=${args.slice(1).join(' ')}`, '_blank');
                handleSetOutput(`Searching youtube for ${args.slice(1).join(' ')}`)
                break;
            case '-g':
                window.open(`https://github.com/search?q=${args.slice(1).join(' ')}`, '_blank');
                handleSetOutput(`Searching github for ${args.slice(1).join(' ')}`)
                break;
            case '-h':
                window.open(`https://${args.slice(1).join(' ')}`, '_blank');
                handleSetOutput(`Opening https://${args.slice(1).join(' ')}`)
                break;
            default:
                const page = navLinks.find((link) => link.name.toLowerCase() === `${arg.toLowerCase()}`);
                if (page) {
                    if (page.download !== undefined) {
                        const link = document.createElement("a");
                        link.href = page.download;
                        link.download = page.download;
                        link.click();
                        handleSetOutput(`Downloading ${page.name}`);
                        return;
                    }
                    else if (page.url === router.pathname) {
                        handleSetOutput(`cd ${arg} \n Already in ${page.name}`);
                        return;
                    }
                    //Use router.push to navigate to the page without refreshing the page
                    router.push(page.url, undefined, { shallow: true });
                    handleSetOutput(`Changing page to ${page.name}`);
                }
                else {
                    handleSetOutput(`cd ${arg}: No such file or directory`);
                }
                break;
        }
    };

    const handleLs = () => {
        // handle ls command
        const pageNames = navLinks.map((link) => link.name);
        handleSetOutput(pageNames.join(' '));
    };

    const handleHelp = (args) => {
        // handle help command
        if (args.length === 0) {
            const commands = ['help \n', 'cd', 'ls', 'help', 'clear', 'exit', '\n For more information on a specific command, type help [command]'];
            handleSetOutput(commands.join(' '));
            return;
        }
        const [arg] = args;
        switch (arg) {
            case 'cd':
                handleSetOutput('cd: cd [page] \n Change the current page to [page] \n cd ..: Go back to home page \n cd -s [query]: Search google for [query] \n cd -y [query]: Search youtube for [query] \n cd -g [query]: Search github for [query] \n cd -h [url]: Open [url] in a new tab');
                break;
            case 'ls':
                handleSetOutput('ls: ls \n List the names of the pages');
                break;
            case 'help':
                handleSetOutput('help: help [command] \n Display information about builtin commands');
                break;
            case 'clear':
                handleSetOutput('clear: clear \n Clear the terminal screen');
                break;
            case 'exit':
                handleSetOutput('exit: exit \n Exit the terminal');
                break;
            default:
                handleSetOutput(`help: no help topics match '${arg}'. Try 'help help'`);
                break;
        }
    };

    const handleClear = () => {
        // handle clear command
        setOutput([]);
    };

    const handleExit = () => {
        // handle exit command
        setIsTerminalOpen(false);
    };
    const handleUnknownCommand = (command) => {
        // handle unknown command
        handleSetOutput(`${command}: command not found`);
    };

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setDragOffset({ x: event.clientX - position.x, y: event.clientY - position.y });
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            setPosition({ x: event.clientX - dragOffset.x, y: event.clientY - dragOffset.y });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleToggleTerminal = () => {
        setIsTerminalOpen(!isTerminalOpen);
    };
    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <>
            {/* <button onClick={handleToggleTerminal}>{isTerminalOpen ? 'Close Terminal' : 'Open Terminal'}</button> */}
            {isTerminalOpen && (
                <div className={`${styles.terminal} ${isTerminalOpen ? 'open' : 'close'}`} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
                    <div className={styles.header} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={(event) => {
                        handleMouseUp(event);
                        handleFocus();
                    }}>
                        <div className={styles.logo}>Terminal</div>
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={handleToggleTerminal}>x</button>
                        </div>
                    </div>
                    <div className={styles.body} onClick={handleFocus}>
                        {output.map((line, index) => (
                            <div key={index}><p>{line}</p></div>
                        ))}
                        <div className={styles.prompt}>
                            <span>&gt;</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={command}
                                onChange={handleInputChange}
                                onKeyDown={handleInputKeyDown}
                                className={styles.input}>
                            </input>
                            {/* <span className={styles.caret}></span> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Terminal;