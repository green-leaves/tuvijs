export declare class NguHanh {
    static readonly Kim: NguHanh;
    static readonly Mộc: NguHanh;
    static readonly Thủy: NguHanh;
    static readonly Hỏa: NguHanh;
    static readonly Thổ: NguHanh;
    private _name;
    private _cuc;
    private _napAm;
    private _cucName;
    static list: NguHanh[];
    constructor(name: string, cuc: number, napAm: number, cucName: string);
    static byNapAm(value: number): NguHanh;
    get cucName(): string;
    get name(): string;
    set name(value: string);
    get cuc(): number;
    set cuc(value: number);
    get napAm(): number;
    set napAm(value: number);
}
