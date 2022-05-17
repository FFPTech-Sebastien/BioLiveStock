type QueueStep = () => Promise<void>;

type ItemWithoutId<T> = Omit<T, 'id'>;
type Item = {
    id: string | number;
};

export default class Simulator<T extends Item> {
    #data: T[];
    #queue: QueueStep[] = [];
    #loop: boolean;
    #delay: number;

    constructor(data: T[], { loop = false, delay = 1000 }) {
        this.#data = [...data];
        this.#loop = loop;
        this.#delay = delay;
    }

    #addToQueue = (cb: (resolve: () => void) => void) => {
        this.#queue.push(() => new Promise(cb));
    };

    addData = (data: ItemWithoutId<T>, cb?: (data: T) => void) => {
        this.#addToQueue((resolve) => {
            setTimeout(() => {
                const item = { ...data, id: this.#data.length + 1 };
                this.#data.push(item as T);
                cb?.(item);
                resolve();
            }, this.#delay);
        });
        return this;
    };

    start = async () => {
        let cb = this.#queue.shift();
        while (cb != null) {
            await cb();
            if (this.#loop) this.#queue.push(cb);
            cb = this.#queue.shift();
        }
    };
}
