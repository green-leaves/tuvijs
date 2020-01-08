
export class Chi {

    public static readonly Tý   =  new Chi(11, "Tý",   0);
    public static readonly Sửu  =  new Chi(12, "Sửu",  0);
    public static readonly Dần  =  new Chi(1,  "Dần",  1);
    public static readonly Mão  =  new Chi(2,  "Mão",  1);
    public static readonly Thìn =  new Chi(3,  "Thìn", 2);
    public static readonly Tị   =  new Chi(4,  "Tị",   2);
    public static readonly Ngọ  =  new Chi(5,  "Ngọ",  0);
    public static readonly Mùi  =  new Chi(6,  "Mùi",  0);
    public static readonly Thân =  new Chi(7,  "Thân", 1);
    public static readonly Dậu  =  new Chi(8,  "Dậu",  1);
    public static readonly Tuất =  new Chi(9,  "Tuất", 2);
    public static readonly Hợi  =  new Chi(10, "Hợi",  2);

    public static readonly list = [
        Chi.Dần ,Chi.Mão ,Chi.Thìn ,Chi.Tị ,Chi.Ngọ ,Chi.Mùi ,Chi.Thân ,Chi.Dậu ,Chi.Tuất ,Chi.Hợi, Chi.Tý ,Chi.Sửu
    ];

    private _value: number;
    private _name: string;
    private _napAm: number;

    private constructor(value: number, name: string, napAm: number) {
        this._value = value;
        this._name = name;
        this._napAm = napAm;
    }

    public static byIndexFromTy(value: number) : Chi {
        let idx = value - 2;
        return Chi.list[idx < 0 ? idx + 12 : idx];
    }

    // Theo chiều kim đồng hồ
    public tien(value: number): Chi {
        return Chi.list[(this.index + value) % 12];
    }

    // Ngược chiều kim đồng hồ
    public lui(value: number): Chi {
        let idx = this.index - (value % 12);
        idx = idx < 0 ? idx + 12 : idx;
        return Chi.list[idx];
    }

    public getValueFromTy(): number {
        return (this.value + 2) % 12;
    }

    public getIndexFromTy(): number {
        return this.getValueFromTy() - 1;
    }

    get index() {
        return this._value - 1;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get napAm(): number {
        return this._napAm;
    }

    set napAm(value: number) {
        this._napAm = value;
    }
}