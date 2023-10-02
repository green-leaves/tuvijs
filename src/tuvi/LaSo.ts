import {Can} from "../core/Can";
import {Chi} from "../core/Chi";
import * as moment from "moment";
import 'moment-lunar';
import {AmLich, HoaGiap} from "../core/Lich";
import {Moment} from "moment";
import {NguHanh} from "../core/NguHanh";
import {ChinhTinh, PhuTinh, TinhDau} from "./TinhDau";
import {AmDuong, CatHung, GioiTinh} from "../core/AmDuong";

export class LaSo {

    private static readonly _6cung = [Chi.Dần, Chi.Sửu, Chi.Thìn, Chi.Ngọ, Chi.Hợi, Chi.Dậu];

    private _amLich: AmLich;
    private _duongLich: Moment;
    private _cuc: NguHanh;
    private _cungList: Cung[] = [];
    private _gioiTinh: GioiTinh;

    constructor() {
      this.anDiaChi();
    }

    public static new(inputDateTime: any,
                      gioiTinh = GioiTinh.Nam,
                      lich = AmDuong.Dương): LaSo {
        let laso = new LaSo();
        laso._gioiTinh = gioiTinh;

        let _momentObj = moment(inputDateTime);

        laso.duongLich = lich === AmDuong.Dương ? _momentObj.clone() : _momentObj.clone().solar();
        laso.amLich = new AmLich(_momentObj, lich);

        this.anLaSo(laso);

        return laso;
    }

    // ==== API ====
    public getCungVi(chi: Chi): Cung {
        return this.cungList[chi.value - 1];
    }

    public getCungChuc(cungChuc: CungChuc): Cung {
        return this.cungList.filter(cung => cung.cungChuc == cungChuc)[0];
    }

    public timSao(sao: TinhDau): Cung {
        return this.cungList.find(cung => cung.getTinhDau().includes(sao));
    }

    // ==== Utils ====
    public static timCanCungDan(canNamSinh: Can) : Can {
        return Can.byValue((canNamSinh.value * 2 + 1) % 10) ;
    }

    public static timCungMenh(thang: number, gio: number): Chi {
        let index = Chi.Dần.tien(thang - 1).lui(gio - 1).index;
        return Chi.list[index];
    }

    // ==== Getter Setter ====
    get cungList(): Cung[] {
        return this._cungList;
    }

    get amLich(): AmLich {
        return this._amLich;
    }

    set amLich(value: AmLich) {
        this._amLich = value;
    }

    get duongLich(): moment.Moment {
        return this._duongLich;
    }

    set duongLich(value: moment.Moment) {
        this._duongLich = value;
    }

    get gioiTinh(): GioiTinh {
        return this._gioiTinh;
    }

    set gioiTinh(value: GioiTinh) {
        this._gioiTinh = value;
    }

    get cuc(): NguHanh {
        return this._cuc;
    }

    set cuc(value: NguHanh) {
        this._cuc = value;
    }

    // === Private ====
    private static anLaSo(laso: LaSo) {
        laso.anThienCan(LaSo.timCanCungDan(laso.amLich.nam.can));
        laso.anCungChuc(LaSo.timCungMenh(laso.amLich.thang.val, laso.amLich.gio.val));
        laso.anCungThan();
        laso.timCucCungMenh();
        laso.anChinhTinh();
        let cungXuongKhuc = laso.anXuongKhuc();
        laso.anTaPhuHuuBat();
        laso.anThienKhoiThienViet();
        laso.anAnQuangThienQuy(cungXuongKhuc);
        laso.anTamThaiBatToa();
        laso.anCoThanQuaTu();
        laso.anDiaKhongDiaKiep();
        laso.anLinhTinhHoaTinh();
        let cungLocTon = laso.anVongLocTon();
        laso.anKinhDuongDaLa(cungLocTon);
        laso.anVongTrangSinh();
        laso.anVongThaiTue();
        laso.anThienKhong();
        laso.anDaoHoaHongLoan();
        laso.anThienHy();
        laso.anThienHinh();
        laso.anThienMa();
        laso.anLongTriPhuongCac();
        laso.anGiaiThan();
        laso.anThienKhocThienHu();
        laso.anThienDucNguyenDuc();
        laso.anKiepSat();
        laso.anHoaCai();
        laso.anPhaToai();
        laso.anThienRieuThienY();
        laso.anThienGiaiDiaGiai();
        laso.anQuocAnDuongPhu();
        laso.anThienQuanThienPhuc();
        laso.anLuuHa();
        laso.anThienTru();
        laso.anAmSat();
        laso.anTuHoa();
        laso.anTrietKhong();
        laso.anTuanKhong();
        laso.anDaiVan();
        laso.anTieuVan();
    }

    private anThienCan(canCungDan: Can) {
        let canCungDanIndex: number = canCungDan.value - 1;
        this._cungList.forEach(cung => {
            cung.can = Can.list[(canCungDanIndex++) % 10];
        })
    }

    private anDiaChi() {
        for (const chi of Chi.list) {
            this._cungList.push(new Cung(chi));
        }
    }

    private anCungChuc(chiCungMenh: Chi) {
        let menhIndex = chiCungMenh.value - 1;
        this.cungList.forEach((cung, index) => {
            let diff = index - menhIndex;
            cung.cungChuc =  CungChuc.list[diff >= 0 ? diff : diff + 12];
        });
    }

    private anCungThan() {
        let cungViCungThan = Chi.Dần.tien(this.amLich.thang.val - 1).tien(this.amLich.gio.val - 1);
        this.getCungVi(cungViCungThan).cungThan = true;
    }

    private timCucCungMenh() {
        let cungMenh = this.getCungChuc(CungChuc.Mệnh);
        let napAm = cungMenh.can.napAm + cungMenh.chi.napAm;
        napAm = napAm > 5 ? napAm - 5 : napAm;
        this.cuc = NguHanh.byNapAm(napAm);
    }

    private  anChinhTinh() {
        let cucCungMenh = this.cuc;
        let soDu = this.amLich.ngay.val % cucCungMenh.cuc;
        let thuong = Math.floor(this.amLich.ngay.val / cucCungMenh.cuc);

        if (soDu == 0) {
            soDu = cucCungMenh.cuc;
            thuong -= 1;
        }

        let cungViTuVi = LaSo._6cung[cucCungMenh.cuc - soDu].tien(thuong);

        this.getCungVi(cungViTuVi).anChinhTinh(ChinhTinh.Tử_Vi);
        this.getCungVi(cungViTuVi.lui(1)).anChinhTinh(ChinhTinh.Thiên_Cơ);
        this.getCungVi(cungViTuVi.lui(3)).anChinhTinh(ChinhTinh.Thái_Dương);
        this.getCungVi(cungViTuVi.lui(4)).anChinhTinh(ChinhTinh.Vũ_Khúc);
        this.getCungVi(cungViTuVi.lui(5)).anChinhTinh(ChinhTinh.Thiên_Đồng);
        this.getCungVi(cungViTuVi.lui(8)).anChinhTinh(ChinhTinh.Liêm_Trinh);

        // Thất Sát đối xứng với Tử Vi qua trục Tị Hợi.
        let cungViThatSat = Chi.Hợi.tien(Chi.Hợi.index - cungViTuVi.index + 12);
        this.getCungVi(cungViThatSat).anChinhTinh(ChinhTinh.Thất_Sát);
        this.getCungVi(cungViThatSat.lui(1)).anChinhTinh(ChinhTinh.Thiên_Lương);
        this.getCungVi(cungViThatSat.lui(3)).anChinhTinh(ChinhTinh.Cự_Môn);
        this.getCungVi(cungViThatSat.lui(4)).anChinhTinh(ChinhTinh.Tham_Lang);
        this.getCungVi(cungViThatSat.lui(5)).anChinhTinh(ChinhTinh.Thái_Âm);
        this.getCungVi(cungViThatSat.lui(8)).anChinhTinh(ChinhTinh.Phá_Quân);

        this.getCungVi(cungViThatSat.lui(2)).anChinhTinh(ChinhTinh.Thiên_Tướng);
        this.getCungVi(cungViThatSat.tien(6)).anChinhTinh(ChinhTinh.Thiên_Phủ);
    }

    private anXuongKhuc() {
        let cungVanXuong = Chi.Tuất.lui(this.amLich.gio.val - 1);
        let cungVanKhuc = Chi.Thìn.tien(this.amLich.gio.val - 1);
        this.getCungVi(cungVanXuong).anPhuTinh(PhuTinh.Văn_Xương);
        this.getCungVi(cungVanKhuc).anPhuTinh(PhuTinh.Văn_Khúc);

        return {
            vanXuong: cungVanXuong,
            vanKhuc: cungVanKhuc
        }
    }

    private anTaPhuHuuBat() {
        let cungTaPhu = Chi.Thìn.tien(this.amLich.thang.val - 1);
        let cungHuuBat = Chi.Tuất.lui(this.amLich.thang.val - 1);
        this.getCungVi(cungTaPhu).anPhuTinh(PhuTinh.Tả_Phù);
        this.getCungVi(cungHuuBat).anPhuTinh(PhuTinh.Hữu_Bật);
    }

    private anThienKhoiThienViet() {
        let cungThienKhoi: Chi;
        let cungThienViet: Chi;

        switch (this.amLich.nam.can) {
            case Can.Giáp:
            case Can.Mậu:
                cungThienKhoi = Chi.Sửu;
                cungThienViet = Chi.Mùi;
                break;
            case Can.Ất:
            case Can.Kỷ:
                cungThienKhoi = Chi.Tý;
                cungThienViet = Chi.Thân;
                break;
            case Can.Bính:
            case Can.Đinh:
                cungThienKhoi = Chi.Hợi;
                cungThienViet = Chi.Dậu;
                break;
            case Can.Canh:
            case Can.Tân:
                cungThienKhoi = Chi.Ngọ;
                cungThienViet = Chi.Dần;
                break;
            case Can.Nhâm:
            case Can.Quý:
                cungThienKhoi = Chi.Mão;
                cungThienViet = Chi.Tị;
                break;
        }

        this.getCungVi(cungThienKhoi).anPhuTinh(PhuTinh.Thiên_Khôi);
        this.getCungVi(cungThienViet).anPhuTinh(PhuTinh.Thiên_Việt);
    }

    private anAnQuangThienQuy(cungXuongKhuc: { vanXuong: Chi; vanKhuc: Chi }) {
        let cungAnQuang = cungXuongKhuc.vanXuong.tien(this.amLich.ngay.val - 2);
        let cungThienQuy = cungXuongKhuc.vanKhuc.lui(this.amLich.ngay.val - 2);
        this.getCungVi(cungAnQuang).anPhuTinh(PhuTinh.Ân_Quang);
        this.getCungVi(cungThienQuy).anPhuTinh(PhuTinh.Thiên_Quý);
    }

    private anTamThaiBatToa() {
        let steps = this.amLich.thang.val + this.amLich.ngay.val - 2;
        let cungTamThai = Chi.Thìn.tien(steps);
        let cungBatToa = Chi.Tuất.lui(steps);
        this.getCungVi(cungTamThai).anPhuTinh(PhuTinh.Tam_Thai);
        this.getCungVi(cungBatToa).anPhuTinh(PhuTinh.Bát_Tọa);
    }

    private anCoThanQuaTu() {
        switch (this.amLich.nam.chi) {
            case Chi.Hợi:
            case Chi.Tý:
            case Chi.Sửu:
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.Cô_Thần);
                this.getCungVi(Chi.Tuất).anPhuTinh(PhuTinh.Quả_Tú);
                break;
            case Chi.Dần:
            case Chi.Mão:
            case Chi.Thìn:
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Cô_Thần);
                this.getCungVi(Chi.Sửu).anPhuTinh(PhuTinh.Quả_Tú);
                break;
            case Chi.Tị:
            case Chi.Ngọ:
            case Chi.Mùi:
                this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.Cô_Thần);
                this.getCungVi(Chi.Thìn).anPhuTinh(PhuTinh.Quả_Tú);
                break;
            case Chi.Thân:
            case Chi.Dậu:
            case Chi.Tuất:
                this.getCungVi(Chi.Hợi).anPhuTinh(PhuTinh.Cô_Thần);
                this.getCungVi(Chi.Mùi).anPhuTinh(PhuTinh.Quả_Tú);
                break;
        }
    }

    private anDiaKhongDiaKiep() {
        let cungDiaKhong = Chi.Hợi.lui(this.amLich.gio.val - 1);
        let cungDiaKiep = Chi.Hợi.tien(this.amLich.gio.val - 1);
        this.getCungVi(cungDiaKhong).anPhuTinh(PhuTinh.Địa_Không);
        this.getCungVi(cungDiaKiep).anPhuTinh(PhuTinh.Địa_Kiếp);
    }

    private anVongLocTon(): Chi {
        let cungLocTon = LaSo.getCungLocTon(this.amLich.nam.can);
        let anXuoi = this.amLich.nam.can.amDuong.value == this._gioiTinh.value;
        PhuTinh.vongLocTon.forEach((phuTinh, index) => {
            if (anXuoi) {
                this.getCungVi(cungLocTon.tien(index)).anPhuTinh(phuTinh);
            } else {
                this.getCungVi(cungLocTon.lui(index)).anPhuTinh(phuTinh);
            }
        });

        return cungLocTon;
    }

    private static getCungLocTon(can: Can) {
        switch (can) {
            case Can.Giáp:
                return Chi.Dần;
            case Can.Ất:
                return Chi.Mão;
            case Can.Bính:
            case Can.Mậu:
                return Chi.Tị;
            case Can.Đinh:
            case Can.Kỷ:
                return Chi.Ngọ;
            case Can.Canh:
                return Chi.Thân;
            case Can.Nhâm:
                return Chi.Hợi;
            case Can.Tân:
                return Chi.Dậu;
            case Can.Quý:
                return Chi.Tý;
        }
    }

    private anKinhDuongDaLa(cungLocTon: Chi) {
        this.getCungVi(cungLocTon.tien(1)).anPhuTinh(PhuTinh.Kình_Dương);
        this.getCungVi(cungLocTon.lui(1)).anPhuTinh(PhuTinh.Đà_La);
    }

    private anLinhTinhHoaTinh() {
        let cungHoaTinh;
        let cungLinhTinh;

        switch (this.amLich.nam.chi) {
            case Chi.Dần:
            case Chi.Ngọ:
            case Chi.Tuất:
                cungHoaTinh = Chi.Sửu;
                cungLinhTinh = Chi.Mão;
                break;
            case Chi.Thân:
            case Chi.Tý:
            case Chi.Thìn:
                cungHoaTinh = Chi.Dần;
                cungLinhTinh = Chi.Tuất;
                break;
            case Chi.Tị:
            case Chi.Dậu:
            case Chi.Sửu:
                cungHoaTinh = Chi.Mão;
                cungLinhTinh = Chi.Tuất;
                break;
            case Chi.Hợi:
            case Chi.Mão:
            case Chi.Mùi:
                cungHoaTinh = Chi.Dậu;
                cungLinhTinh = Chi.Tuất;
                break;
        }

        // Âm Nam, Dương Nữ
        if (this.amLich.nam.can.amDuong.value != this.gioiTinh.value) {
            this.getCungVi(cungHoaTinh.lui(this.amLich.gio.val - 1)).anPhuTinh(PhuTinh.Hỏa_Tinh);
            this.getCungVi(cungLinhTinh.tien(this.amLich.gio.val - 1)).anPhuTinh(PhuTinh.Linh_Tinh);
        } else { // Dương Nam, Âm Nữ
            this.getCungVi(cungHoaTinh.tien(this.amLich.gio.val - 1)).anPhuTinh(PhuTinh.Hỏa_Tinh);
            this.getCungVi(cungLinhTinh.lui(this.amLich.gio.val - 1)).anPhuTinh(PhuTinh.Linh_Tinh);
        }
    }

    private anVongThaiTue() {
        PhuTinh.vongThaiTue.forEach((phuTinh, index) => {
            this.getCungVi(this.amLich.nam.chi.tien(index)).anPhuTinh(phuTinh);
        });
    }

    private anThienKhong() {
        this.getCungVi(this.amLich.nam.chi.tien(1)).anPhuTinh(PhuTinh.Thiên_Không);
    }

    private anDaoHoaHongLoan() {
        switch (this.amLich.nam.chi) {
            case Chi.Tị:
            case Chi.Dậu:
            case Chi.Sửu:
                this.getCungVi(Chi.Ngọ).anPhuTinh(PhuTinh.Đào_Hoa);
                break;
            case Chi.Hợi:
            case Chi.Mão:
            case Chi.Mùi:
                this.getCungVi(Chi.Tý).anPhuTinh(PhuTinh.Đào_Hoa);
                break;
            case Chi.Thân:
            case Chi.Tý:
            case Chi.Thìn:
                this.getCungVi(Chi.Dậu).anPhuTinh(PhuTinh.Đào_Hoa);
                break;
            case Chi.Dần:
            case Chi.Ngọ:
            case Chi.Tuất:
                this.getCungVi(Chi.Mão).anPhuTinh(PhuTinh.Đào_Hoa);
                break;
        }

        this.getCungVi(Chi.Mão.lui(this.amLich.nam.chi.getIndexFromTy()))
            .anPhuTinh(PhuTinh.Hồng_Loan);
    }

    private anThienHy() {
        let cungThienHy = Chi.Dậu.lui(this.amLich.nam.chi.getIndexFromTy());
        this.getCungVi(cungThienHy).anPhuTinh(PhuTinh.Thiên_Hỷ);
    }

    private anVongTrangSinh() {
        let cungTrangSinh: Chi;
        switch (this.cuc) {
            case NguHanh.Kim:
                cungTrangSinh = Chi.Tị;
                break;
            case NguHanh.Mộc:
                cungTrangSinh = Chi.Hợi;
                break;
            case NguHanh.Thủy:
                cungTrangSinh = Chi.Thân;
                break;
            case NguHanh.Hỏa:
                cungTrangSinh = Chi.Dần;
                break;
            case NguHanh.Thổ:
                cungTrangSinh = Chi.Thân;
                break;
        }

        let anXuoi = this.amLich.nam.can.amDuong.value == this._gioiTinh.value;
        PhuTinh.vongTrangSinh.forEach((phuTinh, index) => {
            if (anXuoi) {
                this.getCungVi(cungTrangSinh.tien(index)).anPhuTinh(phuTinh)
            } else {
                this.getCungVi(cungTrangSinh.lui(index)).anPhuTinh(phuTinh)
            }
        });

    }

    private anThienHinh() {
        let cungThienHinh = Chi.Dậu.tien(this.amLich.thang.val - 1);
        this.getCungVi(cungThienHinh).anPhuTinh(PhuTinh.Thiên_Hình);
    }

    private anThienMa() {
        switch (this.amLich.nam.chi) {
            case Chi.Dần:
            case Chi.Ngọ:
            case Chi.Tuất:
                this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.Thiên_Mã);
                break;
            case Chi.Thân:
            case Chi.Tý:
            case Chi.Thìn:
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.Thiên_Mã);
                break;
            case Chi.Tị:
            case Chi.Dậu:
            case Chi.Sửu:
                this.getCungVi(Chi.Hợi).anPhuTinh(PhuTinh.Thiên_Mã);
                break;
            case Chi.Hợi:
            case Chi.Mão:
            case Chi.Mùi:
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Thiên_Mã);
                break;

        }
    }

    private anLongTriPhuongCac() {
        let cungLongTri = Chi.Thìn.tien(this.amLich.nam.chi.getIndexFromTy());
        let cungPhuongCac = Chi.Tuất.lui(this.amLich.nam.chi.getIndexFromTy());
        this.getCungVi(cungLongTri).anPhuTinh(PhuTinh.Long_Trì);
        this.getCungVi(cungPhuongCac).anPhuTinh(PhuTinh.Phượng_Các);
    }

    private anGiaiThan() {
        let cungGiaiThan = Chi.Tuất.lui(this.amLich.nam.chi.getIndexFromTy());
        this.getCungVi(cungGiaiThan).anPhuTinh(PhuTinh.Giải_Thần);
    }

    private anThienKhocThienHu() {
        let cungThienKhoc = Chi.Ngọ.lui(this.amLich.nam.chi.getIndexFromTy());
        let cungThienHu = Chi.Ngọ.tien(this.amLich.nam.chi.getIndexFromTy());
        this.getCungVi(cungThienKhoc).anPhuTinh(PhuTinh.Thiên_Khốc);
        this.getCungVi(cungThienHu).anPhuTinh(PhuTinh.Thiên_Hư);
    }

    private anThienDucNguyenDuc() {
        let cungThienDuc = Chi.Dậu.tien(this.amLich.nam.chi.getIndexFromTy());
        let cungNguyetDuc = Chi.Tị.tien(this.amLich.nam.chi.getIndexFromTy());
        this.getCungVi(cungThienDuc).anPhuTinh(PhuTinh.Thiên_Đức);
        this.getCungVi(cungNguyetDuc).anPhuTinh(PhuTinh.Nguyệt_Đức);
    }

    private anKiepSat() {
        switch (this.amLich.nam.chi) {
            case Chi.Thân:
            case Chi.Tý:
            case Chi.Thìn:
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Kiếp_Sát);
                break;
            case Chi.Sửu:
            case Chi.Tị:
            case Chi.Dậu:
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.Kiếp_Sát);
                break;
            case Chi.Dần:
            case Chi.Ngọ:
            case Chi.Tuất:
                this.getCungVi(Chi.Hợi).anPhuTinh(PhuTinh.Kiếp_Sát);
                break;
            case Chi.Hợi:
            case Chi.Mão:
            case Chi.Mùi:
                this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.Kiếp_Sát);
                break;
        }
    }

    private anHoaCai() {
        switch (this.amLich.nam.chi) {
            case Chi.Thân:
            case Chi.Tý:
            case Chi.Thìn:
                this.getCungVi(Chi.Thìn).anPhuTinh(PhuTinh.Hoa_Cái);
                break;
            case Chi.Sửu:
            case Chi.Tị:
            case Chi.Dậu:
                this.getCungVi(Chi.Sửu).anPhuTinh(PhuTinh.Hoa_Cái);
                break;
            case Chi.Dần:
            case Chi.Ngọ:
            case Chi.Tuất:
                this.getCungVi(Chi.Tuất).anPhuTinh(PhuTinh.Hoa_Cái);
                break;
            case Chi.Hợi:
            case Chi.Mão:
            case Chi.Mùi:
                this.getCungVi(Chi.Hợi).anPhuTinh(PhuTinh.Hoa_Cái);
                break;
        }
    }

    private anPhaToai() {
        switch (this.amLich.nam.chi) {
            case Chi.Tý:
            case Chi.Ngọ:
            case Chi.Mão:
            case Chi.Dậu:
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Phá_Toái);
                break;
            case Chi.Thìn:
            case Chi.Tuất:
            case Chi.Sửu:
            case Chi.Mùi:
                this.getCungVi(Chi.Sửu).anPhuTinh(PhuTinh.Phá_Toái);
                break;
            case Chi.Dần:
            case Chi.Thân:
            case Chi.Tị:
            case Chi.Hợi:
                this.getCungVi(Chi.Dậu).anPhuTinh(PhuTinh.Phá_Toái);
                break;
        }
    }

    private anThienRieuThienY() {
        let cungRieuY = Chi.Sửu.tien(this.amLich.thang.val - 1);
        this.getCungVi(cungRieuY).anPhuTinh(PhuTinh.Thiên_Riêu);
        this.getCungVi(cungRieuY).anPhuTinh(PhuTinh.Thiên_Y);
    }

    private anThienGiaiDiaGiai() {
        let cungThienGiai = Chi.Thân.tien(this.amLich.nam.val - 1);
        let cungDiaGiai = Chi.Mùi.tien(this.amLich.nam.val - 1);

        this.getCungVi(cungThienGiai).anPhuTinh(PhuTinh.Thiên_Giải);
        this.getCungVi(cungDiaGiai).anPhuTinh(PhuTinh.Địa_Giải);
    }

    private anQuocAnDuongPhu() {
        switch (this.amLich.nam.can) {
            case Can.Giáp:
                this.getCungVi(Chi.Tuất).anPhuTinh(PhuTinh.Quốc_Ấn);
                this.getCungVi(Chi.Mùi).anPhuTinh(PhuTinh.Đường_Phù);
                break;
            case Can.Ất:
                this.getCungVi(Chi.Hợi).anPhuTinh(PhuTinh.Quốc_Ấn);
                this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.Đường_Phù);
                break;
            case Can.Bính:
            case Can.Mậu:
                this.getCungVi(Chi.Sửu).anPhuTinh(PhuTinh.Quốc_Ấn);
                this.getCungVi(Chi.Tuất).anPhuTinh(PhuTinh.Đường_Phù);
                break;
            case Can.Đinh:
            case Can.Kỷ:
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.Quốc_Ấn);
                this.getCungVi(Chi.Hợi).anPhuTinh(PhuTinh.Đường_Phù);
                break;
            case Can.Canh:
                this.getCungVi(Chi.Thìn).anPhuTinh(PhuTinh.Quốc_Ấn);
                this.getCungVi(Chi.Sửu).anPhuTinh(PhuTinh.Đường_Phù);
                break;
            case Can.Tân:
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Quốc_Ấn);
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.Đường_Phù);
                break;
            case Can.Nhâm:
                this.getCungVi(Chi.Mùi).anPhuTinh(PhuTinh.Quốc_Ấn);
                this.getCungVi(Chi.Thìn).anPhuTinh(PhuTinh.Đường_Phù);
                break;
            case Can.Quý:
                this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.Quốc_Ấn);
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Đường_Phù);
                break;

        }
    }

    private anThienQuanThienPhuc() {
        switch (this.amLich.nam.can) {
            case Can.Giáp:
                this.getCungVi(Chi.Mùi).anPhuTinh(PhuTinh.Thiên_Quan);
                this.getCungVi(Chi.Dậu).anPhuTinh(PhuTinh.Thiên_Phúc);
                break;
            case Can.Ất:
                this.getCungVi(Chi.Thìn).anPhuTinh(PhuTinh.Thiên_Quan);
                this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.Thiên_Phúc);
                break;
            case Can.Bính:
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Thiên_Quan);
                this.getCungVi(Chi.Tý).anPhuTinh(PhuTinh.Thiên_Phúc);
                break;
            case Can.Đinh:
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.Thiên_Quan);
                this.getCungVi(Chi.Hợi).anPhuTinh(PhuTinh.Thiên_Phúc);
                break;
            case Can.Mậu:
                this.getCungVi(Chi.Mão).anPhuTinh(PhuTinh.Thiên_Quan);
                this.getCungVi(Chi.Mão).anPhuTinh(PhuTinh.Thiên_Phúc);
                break;
            case Can.Kỷ:
                this.getCungVi(Chi.Dậu).anPhuTinh(PhuTinh.Thiên_Quan);
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.Thiên_Phúc);
                break;
            case Can.Canh:
                this.getCungVi(Chi.Hợi).anPhuTinh(PhuTinh.Thiên_Quan);
                this.getCungVi(Chi.Ngọ).anPhuTinh(PhuTinh.Thiên_Phúc);
                break;
            case Can.Tân:
                this.getCungVi(Chi.Dậu).anPhuTinh(PhuTinh.Thiên_Quan);
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Thiên_Phúc);
                break;
            case Can.Nhâm:
                this.getCungVi(Chi.Tuất).anPhuTinh(PhuTinh.Thiên_Quan);
                this.getCungVi(Chi.Ngọ).anPhuTinh(PhuTinh.Thiên_Phúc);
                break;
            case Can.Quý:
                this.getCungVi(Chi.Ngọ).anPhuTinh(PhuTinh.Thiên_Quan);
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Thiên_Phúc);
                break;
        }
    }

    private anLuuHa() {
        switch (this.amLich.nam.can) {
            case Can.Giáp:
                this.getCungVi(Chi.Dậu).anPhuTinh(PhuTinh.Lưu_Hà);
                break;
            case Can.Ất:
                this.getCungVi(Chi.Tuất).anPhuTinh(PhuTinh.Lưu_Hà);
                break;
            case Can.Bính:
                this.getCungVi(Chi.Mùi).anPhuTinh(PhuTinh.Lưu_Hà);
                break;
            case Can.Đinh:
                this.getCungVi(Chi.Thìn).anPhuTinh(PhuTinh.Lưu_Hà);
                break;
            case Can.Mậu:
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Lưu_Hà);
                break;
            case Can.Kỷ:
                this.getCungVi(Chi.Ngọ).anPhuTinh(PhuTinh.Lưu_Hà);
                break;
            case Can.Canh:
                this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.Lưu_Hà);
                break;
            case Can.Tân:
                this.getCungVi(Chi.Mão).anPhuTinh(PhuTinh.Lưu_Hà);
                break;
            case Can.Nhâm:
                this.getCungVi(Chi.Hợi).anPhuTinh(PhuTinh.Lưu_Hà);
                break;
            case Can.Quý:
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.Lưu_Hà);
                break;
        }
    }

    private anThienTru() {
        switch (this.amLich.nam.can) {
            case Can.Giáp:
            case Can.Đinh:
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.Thiên_Trù);
                break;
            case Can.Ất:
            case Can.Mậu:
            case Can.Tân:
                this.getCungVi(Chi.Ngọ).anPhuTinh(PhuTinh.Thiên_Trù);
                break;
            case Can.Bính:
                this.getCungVi(Chi.Tý).anPhuTinh(PhuTinh.Thiên_Trù);
                break;
            case Can.Kỷ:
                this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.Thiên_Trù);
                break;
            case Can.Canh:
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.Thiên_Trù);
                break;
            case Can.Nhâm:
                this.getCungVi(Chi.Dậu).anPhuTinh(PhuTinh.Thiên_Trù);
                break;
            case Can.Quý:
                this.getCungVi(Chi.Tuất).anPhuTinh(PhuTinh.Thiên_Trù);
                break;
        }
    }

    private anAmSat() {
        switch (this.amLich.thang.val) {
            case 1:
            case 7:
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.Âm_Sát);
                break;
            case 2:
            case 8:
                this.getCungVi(Chi.Tý).anPhuTinh(PhuTinh.Âm_Sát);
                break;
            case 3:
            case 9:
                this.getCungVi(Chi.Tuất).anPhuTinh(PhuTinh.Âm_Sát);
                break;
            case 4:
            case 10:
                this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.Âm_Sát);
                break;
            case 5:
            case 11:
                this.getCungVi(Chi.Ngọ).anPhuTinh(PhuTinh.Âm_Sát);
                break;
            case 6:
            case 12:
                this.getCungVi(Chi.Mão).anPhuTinh(PhuTinh.Âm_Sát);
                break;
        }
    }

    private anTuHoa() {
        let saoHoa: TinhDau[];
        switch (this.amLich.nam.can) {
            case Can.Giáp:
                saoHoa = [ChinhTinh.Liêm_Trinh, ChinhTinh.Phá_Quân, ChinhTinh.Vũ_Khúc, ChinhTinh.Thái_Dương];
                break;
            case Can.Ất:
                saoHoa = [ChinhTinh.Thiên_Cơ, ChinhTinh.Thiên_Lương, ChinhTinh.Tử_Vi, ChinhTinh.Thái_Âm];
                break;
            case Can.Bính:
                saoHoa = [ChinhTinh.Thiên_Đồng, ChinhTinh.Thiên_Cơ, PhuTinh.Văn_Xương, ChinhTinh.Liêm_Trinh];
                break;
            case Can.Đinh:
                saoHoa = [ChinhTinh.Thái_Âm, ChinhTinh.Thiên_Đồng, ChinhTinh.Thiên_Cơ, ChinhTinh.Cự_Môn];
                break;
            case Can.Mậu:
                saoHoa = [ChinhTinh.Tham_Lang, ChinhTinh.Thái_Âm, PhuTinh.Hữu_Bật, ChinhTinh.Thiên_Cơ];
                break;
            case Can.Kỷ:
                saoHoa = [ChinhTinh.Vũ_Khúc, ChinhTinh.Tham_Lang, ChinhTinh.Thiên_Lương, PhuTinh.Văn_Khúc];
                break;
            case Can.Canh:
                saoHoa = [ChinhTinh.Thái_Dương, ChinhTinh.Vũ_Khúc, ChinhTinh.Thiên_Đồng, ChinhTinh.Thái_Âm];
                break;
            case Can.Tân:
                saoHoa = [ChinhTinh.Cự_Môn, ChinhTinh.Thái_Dương, PhuTinh.Văn_Khúc, PhuTinh.Văn_Xương];
                break;
            case Can.Nhâm:
                saoHoa = [ChinhTinh.Thiên_Lương, ChinhTinh.Tử_Vi, PhuTinh.Tả_Phù, ChinhTinh.Vũ_Khúc];
                break;
            case Can.Quý:
                saoHoa = [ChinhTinh.Phá_Quân, ChinhTinh.Cự_Môn, ChinhTinh.Thái_Âm, ChinhTinh.Tham_Lang];
                break;
        }

        saoHoa.forEach((sao, index) => {
            this.timSao(sao).anPhuTinh(PhuTinh.tuHoa[index]);
        });
    }

    private anTrietKhong() {
        switch (this.amLich.nam.can) {
            case Can.Giáp:
            case Can.Kỷ:
                this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.TRIỆT);
                this.getCungVi(Chi.Dậu).anPhuTinh(PhuTinh.TRIỆT);
                break;
            case Can.Ất:
            case Can.Canh:
                this.getCungVi(Chi.Ngọ).anPhuTinh(PhuTinh.TRIỆT);
                this.getCungVi(Chi.Mùi).anPhuTinh(PhuTinh.TRIỆT);
                break;
            case Can.Bính:
            case Can.Tân:
                this.getCungVi(Chi.Thìn).anPhuTinh(PhuTinh.TRIỆT);
                this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.TRIỆT);
                break;
            case Can.Đinh:
            case Can.Nhâm:
                this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.TRIỆT);
                this.getCungVi(Chi.Mão).anPhuTinh(PhuTinh.TRIỆT);
                break;
            case Can.Mậu:
            case Can.Quý:
                this.getCungVi(Chi.Tý).anPhuTinh(PhuTinh.TRIỆT);
                this.getCungVi(Chi.Sửu).anPhuTinh(PhuTinh.TRIỆT);
                break;
        }
    }

    private anTuanKhong() {
        let namHoaGiap = this.amLich.nam.hoaGiap;
        if (HoaGiap.Tuần_Giáp_Tý.some(hoaGiap => hoaGiap.equals(namHoaGiap))) {
            this.getCungVi(Chi.Tuất).anPhuTinh(PhuTinh.TUẦN);
            this.getCungVi(Chi.Hợi).anPhuTinh(PhuTinh.TUẦN);
        } else if (HoaGiap.Tuần_Giáp_Tuất.some(hoaGiap => hoaGiap.equals(namHoaGiap))) {
            this.getCungVi(Chi.Thân).anPhuTinh(PhuTinh.TUẦN);
            this.getCungVi(Chi.Dậu).anPhuTinh(PhuTinh.TUẦN);
        } else if (HoaGiap.Tuần_Giáp_Thân.some(hoaGiap => hoaGiap.equals(namHoaGiap))) {
            this.getCungVi(Chi.Ngọ).anPhuTinh(PhuTinh.TUẦN);
            this.getCungVi(Chi.Mùi).anPhuTinh(PhuTinh.TUẦN);
        } else if (HoaGiap.Tuần_Giáp_Ngọ.some(hoaGiap => hoaGiap.equals(namHoaGiap))) {
            this.getCungVi(Chi.Thìn).anPhuTinh(PhuTinh.TUẦN);
            this.getCungVi(Chi.Tị).anPhuTinh(PhuTinh.TUẦN);
        } else if (HoaGiap.Tuần_Giáp_Thìn.some(hoaGiap => hoaGiap.equals(namHoaGiap))) {
            this.getCungVi(Chi.Dần).anPhuTinh(PhuTinh.TUẦN);
            this.getCungVi(Chi.Mão).anPhuTinh(PhuTinh.TUẦN);
        } else if (HoaGiap.Tuần_Giáp_Dần.some(hoaGiap => hoaGiap.equals(namHoaGiap))) {
            this.getCungVi(Chi.Tý).anPhuTinh(PhuTinh.TUẦN);
            this.getCungVi(Chi.Sửu).anPhuTinh(PhuTinh.TUẦN);
        }
    }

    private anDaiVan() {
        let amDuongNum = this.amLich.nam.can.amDuong.value + this.gioiTinh.value;
        if (amDuongNum == 2) {
            amDuongNum = 0;
        }
        let cungMenh = this.getCungChuc(CungChuc.Mệnh);
        cungMenh.daiVan = this.cuc.cuc;

        if (amDuongNum == 0) {
            for (let i = 1; i < this.cungList.length; i++) {
                this.getCungVi(cungMenh.chi.tien(i)).daiVan = 10 * i + this.cuc.cuc;
            }
        } else if (amDuongNum == 1) {
            for (let i = 1; i < this.cungList.length; i++) {
                this.getCungVi(cungMenh.chi.lui(i)).daiVan = 10 * i + this.cuc.cuc;
            }
        }
    }

    private anTieuVan() {
        let chiNam = this.amLich.nam.chi;
        let cungStart;
        switch (chiNam) {
            case Chi.Thân:
            case Chi.Tý:
            case Chi.Thìn:
                cungStart = Chi.Tuất;
                break;
            case Chi.Hợi:
            case Chi.Mão:
            case Chi.Mùi:
                cungStart = Chi.Sửu;
                break;
            case Chi.Dần:
            case Chi.Ngọ:
            case Chi.Tuất:
                cungStart = Chi.Thìn;
                break;
            case Chi.Tị:
            case Chi.Dậu:
            case Chi.Sửu:
                cungStart = Chi.Mùi;
                break;
        }

        for (let i = 0; i < this.cungList.length; i++) {
            if (this.gioiTinh == GioiTinh.Nam) {
                this.getCungVi(cungStart.tien(i)).tieuVan = chiNam.tien(i);
            } else if (this.gioiTinh == GioiTinh.Nữ) {
                this.getCungVi(cungStart.lui(i)).tieuVan = chiNam.tien(i);
            }
        }

    }
}

export class Cung {
    private _can: Can;
    private _chi: Chi;
    private _cungChuc: CungChuc;
    private _cungThan: boolean = false;
    private _chinhTinh: ChinhTinh[] = [];
    private _phuTinh: PhuTinh[] = [];
    private _daiVan: number;
    private _tieuVan: Chi;

    constructor(chi: Chi) {
        this._chi = chi;
    }

    public anChinhTinh(chinhTinh: ChinhTinh) {
        this.chinhTinh.push(chinhTinh);
    }

    public anPhuTinh(phuTinh: PhuTinh) {
        this.phuTinh.push(phuTinh);
    }

    public getTinhDau(): TinhDau[] {
        return this.chinhTinh.concat(this.phuTinh);
    }

    get phuTinhTot() : PhuTinh[] {
        return this._phuTinh.filter(phuTinh => phuTinh.type == null || CatHung.Cát.equals(phuTinh.type));
    }

    get phuTinhXau() : PhuTinh[] {
        return this._phuTinh.filter(phuTinh => CatHung.Hung.equals(phuTinh.type));
    }

    get can(): Can {
        return this._can;
    }

    set can(value: Can) {
        this._can = value;
    }

    get chi(): Chi {
        return this._chi;
    }

    set chi(value: Chi) {
        this._chi = value;
    }

    get cungChuc(): CungChuc {
        return this._cungChuc;
    }

    set cungChuc(value: CungChuc) {
        this._cungChuc = value;
    }

    get cungThan(): boolean {
        return this._cungThan;
    }

    set cungThan(value: boolean) {
        this._cungThan = value;
    }

    get chinhTinh(): ChinhTinh[] {
        return this._chinhTinh;
    }

    set chinhTinh(value: ChinhTinh[]) {
        this._chinhTinh = value;
    }


    get phuTinh(): PhuTinh[] {
        return this._phuTinh;
    }

    set phuTinh(value: PhuTinh[]) {
        this._phuTinh = value;
    }


    get daiVan(): number {
        return this._daiVan;
    }

    set daiVan(value: number) {
        this._daiVan = value;
    }


    get tieuVan(): Chi {
        return this._tieuVan;
    }

    set tieuVan(value: Chi) {
        this._tieuVan = value;
    }
}

export class CungChuc {
    public static readonly Mệnh  = new CungChuc("Mệnh");
    public static readonly Phụ   = new CungChuc("Phụ Mẫu");
    public static readonly Phúc  = new CungChuc("Phúc Đức");
    public static readonly Điền  = new CungChuc("Điền Trạch");
    public static readonly Quan  = new CungChuc("Quan Lộc");
    public static readonly Nô    = new CungChuc("Nô Bộc");
    public static readonly Di    = new CungChuc("Thiên Di");
    public static readonly Tật   = new CungChuc("Tật Ách");
    public static readonly Tài   = new CungChuc("Tài Bạch");
    public static readonly Tử    = new CungChuc("Tử Tức");
    public static readonly Phối  = new CungChuc("Phu Thê");
    public static readonly Huynh = new CungChuc("Huynh Đệ");

    public static readonly list = [
        CungChuc.Mệnh, CungChuc.Phụ, CungChuc.Phúc, CungChuc.Điền, CungChuc.Quan, CungChuc.Nô,
        CungChuc.Di, CungChuc.Tật, CungChuc.Tài, CungChuc.Tử, CungChuc.Phối, CungChuc.Huynh
    ];

    private _name: string;

    private constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }
}
