export class AmDuong {
    public static readonly Âm = new AmDuong("Âm", 0);
    public static readonly Dương = new AmDuong("Dương", 1);

    private _name: string;
    private _value: number;

    protected constructor(name: string, value: number) {
        this._name = name;
        this._value = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }
}

export class GioiTinh extends AmDuong {
    public static readonly Nam = new GioiTinh("Nam", AmDuong.Dương);
    public static readonly Nữ = new GioiTinh("Nữ", AmDuong.Âm);

    private _gioiTinh: string;

    constructor(gioiTinh: string, amDuong: AmDuong) {
        super(amDuong.name, amDuong.value);
        this.gioiTinh = gioiTinh
    }

    get gioiTinh(): string {
        return this._gioiTinh;
    }

    set gioiTinh(value: string) {
        this._gioiTinh = value;
    }
}

export class CatHung extends AmDuong {
    public static readonly Cát = new CatHung("Cát", AmDuong.Dương);
    public static readonly Hung = new CatHung("Hung", AmDuong.Âm);

    private _val: string;

    constructor(val: string, amDuong: AmDuong) {
        super(amDuong.name, amDuong.value);
        this._val = val
    }

    public equals(catHung: CatHung): boolean {
        return catHung != null && catHung.val === this.val;
    }

    get val(): string {
        return this._val;
    }

    set val(value: string) {
        this._val = value;
    }
}


