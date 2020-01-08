export class NguHanh {
    public static readonly Kim  =    new NguHanh("Kim",  4, 1);
    public static readonly Mộc  =    new NguHanh("Mộc",  3, 5);
    public static readonly Thủy =    new NguHanh("Thủy", 2, 2);
    public static readonly Hỏa  =    new NguHanh("Hỏa",  6, 3);
    public static readonly Thổ  =    new NguHanh("Thổ",  5, 4);

    private _name: string;
    private _cuc: number;
    private _napAm: number;

    public static list = [
        NguHanh.Kim, NguHanh.Mộc, NguHanh.Thủy, NguHanh.Hỏa, NguHanh.Thổ
    ];

    constructor(name: string, cuc: number, napAm: number) {
        this._name = name;
        this._cuc = cuc;
        this._napAm = napAm;
    }

    public static byNapAm(value: number): NguHanh {
        return NguHanh.list.filter(hanh => hanh.napAm == value)[0];
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get cuc(): number {
        return this._cuc;
    }

    set cuc(value: number) {
        this._cuc = value;
    }

    get napAm(): number {
        return this._napAm;
    }

    set napAm(value: number) {
        this._napAm = value;
    }
}
