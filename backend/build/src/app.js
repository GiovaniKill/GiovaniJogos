import express from 'express';
class App {
    constructor() {
        this.app = express();
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
}
export { App };
//# sourceMappingURL=app.js.map