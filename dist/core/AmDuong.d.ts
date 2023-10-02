export declare class AmDuong {
    static readonly Âm: AmDuong;
    static readonly Dương: AmDuong;
    private _name;
    private _value;
    protected constructor(name: string, value: number);
    static from(val: string): AmDuong;
    static fromNum(val: number): AmDuong;
    get name(): string;
    get value(): number;
}
export declare class GioiTinh extends AmDuong {
    static readonly Nam: GioiTinh;
    static readonly Nữ: GioiTinh;
    private _gioiTinh;
    constructor(gioiTinh: string, amDuong: AmDuong);
    static from(val: string): GioiTinh;
    get gioiTinh(): string;
    set gioiTinh(value: string);
}
export declare class CatHung extends AmDuong {
    static readonly Cát: CatHung;
    static readonly Hung: CatHung;
    private _val;
    constructor(val: string, amDuong: AmDuong);
    equals(catHung: CatHung): boolean;
    get val(): string;
    set val(value: string);
}
