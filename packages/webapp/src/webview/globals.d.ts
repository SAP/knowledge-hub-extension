interface Window {
    vscode: {
        postMessage: (message: string) => Record<string, unknown>;
    };
}
