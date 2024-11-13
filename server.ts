// src/server.ts
import { connectDB } from "./src/database/index";
import app from "./app";


const startServer = async (): Promise<void> => {
    try {

        await connectDB();


        const PORT = process.env.PORT || 5001;


        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${(error as Error).message}`);
        process.exit(1);
    }
};

// Start the server
startServer();
