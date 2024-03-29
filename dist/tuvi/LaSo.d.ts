import { Can } from "../core/Can";
import { Chi } from "../core/Chi";
import * as moment from "moment";
import 'moment-lunar';
import { AmLich } from "../core/Lich";
import { NguHanh } from "../core/NguHanh";
import { ChinhTinh, PhuTinh, TinhDau } from "./TinhDau";
import { AmDuong, GioiTinh } from "../core/AmDuong";
export declare class LaSo {
    private static readonly _6cung;
    private _amLich;
    private _duongLich;
    private _cuc;
    private _menh;
    private _cungList;
    private _gioiTinh;
    constructor();
    static new(inputDateTime: any, gioiTinh?: GioiTinh, lich?: AmDuong): LaSo;
    getCungVi(chi: Chi): Cung;
    getCungChuc(cungChuc: CungChuc): Cung;
    timSao(sao: TinhDau): Cung;
    static timCanCungDan(canNamSinh: Can): Can;
    static timCungMenh(thang: number, gio: number): Chi;
    get cungList(): Cung[];
    get amLich(): AmLich;
    set amLich(value: AmLich);
    get duongLich(): moment.Moment;
    set duongLich(value: moment.Moment);
    get gioiTinh(): GioiTinh;
    set gioiTinh(value: GioiTinh);
    get cuc(): NguHanh;
    set cuc(value: NguHanh);
    get menh(): NguHanh;
    set menh(value: NguHanh);
    private static anLaSo;
    private timHanhNamSinh;
    private anThienCan;
    private anDiaChi;
    private anCungChuc;
    private anCungThan;
    private timCucCungMenh;
    private anChinhTinh;
    private anXuongKhuc;
    private anTaPhuHuuBat;
    private anThienKhoiThienViet;
    private anAnQuangThienQuy;
    private anTamThaiBatToa;
    private anCoThanQuaTu;
    private anDiaKhongDiaKiep;
    private anVongLocTon;
    private static getCungLocTon;
    private anKinhDuongDaLa;
    private anLinhTinhHoaTinh;
    private anVongThaiTue;
    private anThienKhong;
    private anDaoHoaHongLoan;
    private anThienHy;
    private anVongTrangSinh;
    private anThienHinh;
    private anThienMa;
    private anLongTriPhuongCac;
    private anGiaiThan;
    private anThienKhocThienHu;
    private anThienDucNguyenDuc;
    private anKiepSat;
    private anHoaCai;
    private anPhaToai;
    private anThienRieuThienY;
    private anThienGiaiDiaGiai;
    private anQuocAnDuongPhu;
    private anThienQuanThienPhuc;
    private anLuuHa;
    private anThienTru;
    private anAmSat;
    private anTuHoa;
    private timTuHoaTheoCan;
    private anTrietKhong;
    private anTuanKhong;
    private anDaiVan;
    private anTieuVan;
    private anTuHoaPhiTinh;
}
export declare class Cung {
    private _can;
    private _chi;
    private _cungChuc;
    private _cungThan;
    private _chinhTinh;
    private _phuTinh;
    private _daiVan;
    private _tieuVan;
    private _tuHoaPhiTinh;
    constructor(chi: Chi);
    anChinhTinh(chinhTinh: ChinhTinh): void;
    anPhuTinh(phuTinh: PhuTinh): void;
    getTinhDau(): TinhDau[];
    get phuTinhTot(): PhuTinh[];
    get phuTinhXau(): PhuTinh[];
    get phiHoaLoc(): CungChuc;
    get can(): Can;
    set can(value: Can);
    get chi(): Chi;
    set chi(value: Chi);
    get cungChuc(): CungChuc;
    set cungChuc(value: CungChuc);
    get cungThan(): boolean;
    set cungThan(value: boolean);
    get chinhTinh(): ChinhTinh[];
    set chinhTinh(value: ChinhTinh[]);
    get phuTinh(): PhuTinh[];
    set phuTinh(value: PhuTinh[]);
    get daiVan(): number;
    set daiVan(value: number);
    get tieuVan(): Chi;
    set tieuVan(value: Chi);
    get tuHoaPhiTinh(): CungChuc[];
    set tuHoaPhiTinh(value: CungChuc[]);
}
export declare class CungChuc {
    static readonly Mệnh: CungChuc;
    static readonly Phụ: CungChuc;
    static readonly Phúc: CungChuc;
    static readonly Điền: CungChuc;
    static readonly Quan: CungChuc;
    static readonly Nô: CungChuc;
    static readonly Di: CungChuc;
    static readonly Tật: CungChuc;
    static readonly Tài: CungChuc;
    static readonly Tử: CungChuc;
    static readonly Phối: CungChuc;
    static readonly Huynh: CungChuc;
    static readonly list: CungChuc[];
    private _name;
    private constructor();
    get name(): string;
}
