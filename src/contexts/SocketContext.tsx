import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import globalConfig from '../config/global.config';

const { SOCKET_URL } = globalConfig;

type ISocketProvider = {
    socket: Socket | null;
};

const SocketContext = createContext<Partial<ISocketProvider>>({});

export const useSocket = () => {
    return useContext(SocketContext);
};

type SocketProviderProps = {
    children: ReactNode;
};

// provide the socket instance through the whole app
const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<ISocketProvider>({ socket: null });

    useEffect(() => {
        const socket = io('http://192.168.25.157:4000');

        setSocket({ socket });
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
