type QueueStep = () => Promise<void>;

type ItemWithoutId<T> = Omit<T, 'id'>;

export default class Simulator<T> {
    #data: T[];
    #queue: QueueStep[] = [];
    #loop: boolean;
    #delay: number;
    #dataGenerator: () => ItemWithoutId<T>;

    constructor(
        data: T[],
        { loop = false, delay = 10000 },
        dataGenerator: () => ItemWithoutId<T>
    ) {
        this.#data = [...data];
        this.#loop = loop;
        this.#delay = delay;
        this.#dataGenerator = dataGenerator;
    }

    #addToQueue = (cb: (resolve: () => void) => void) => {
        this.#queue.push(() => new Promise(cb));
    };

    addData = (cb: (data: T) => void) => {
        this.#addToQueue((resolve) => {
            setTimeout(() => {
                const item = {
                    ...this.#dataGenerator(),
                    id: this.#data.length + 1,
                } as T;
                this.#data.push(item);
                cb(item);
                resolve();
            }, this.#delay);
        });
        return this;
    };

    start = async () => {
        let cb = this.#queue.shift();
        while (cb != null) {
            await cb();
            if (this.#loop) {
                this.#queue.push(cb);
            }
            cb = this.#queue.shift();
        }
    };
}
