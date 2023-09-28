import {CatHung} from "../core/AmDuong";

export interface TinhDau {
    name: string;
}

export class ChinhTinh implements TinhDau {
    public static readonly Tử_Vi = new ChinhTinh("Tử Vi");
    public static readonly Thiên_Cơ = new ChinhTinh("Thiên Cơ");
    public static readonly Thái_Dương = new ChinhTinh("Thái Dương");
    public static readonly Vũ_Khúc = new ChinhTinh("Vũ Khúc");
    public static readonly Thiên_Đồng = new ChinhTinh("Thiên Đồng");
    public static readonly Liêm_Trinh = new ChinhTinh("Liêm Trinh");

    public static readonly Thất_Sát = new ChinhTinh("Thất Sát");
    public static readonly Thiên_Lương = new ChinhTinh("Thiên Lương");
    public static readonly Cự_Môn = new ChinhTinh("Cự Môn");
    public static readonly Tham_Lang = new ChinhTinh("Tham Lang");
    public static readonly Thái_Âm = new ChinhTinh("Thái Âm");
    public static readonly Phá_Quân = new ChinhTinh("Phá Quân");

    public static readonly Thiên_Phủ = new ChinhTinh("Thiên Phủ");
    public static readonly Thiên_Tướng = new ChinhTinh("Thiên Tướng");

    name: string;


    constructor(name: string) {
        this.name = name;
    }
}

export class TinhDauGroup {
    public static readonly Lục_Cát: TinhDauGroup = new TinhDauGroup("Lục Cát");
    public static readonly Lục_Sát: TinhDauGroup = new TinhDauGroup("Lục Sát");

    private _val: string;

    constructor(val: string) {
        this._val = val;
    }
}

export class PhuTinh implements TinhDau {

    public static readonly Văn_Xương = new PhuTinh("Văn Xương", CatHung.Cát, TinhDauGroup.Lục_Cát);
    public static readonly Văn_Khúc = new PhuTinh("Văn Khúc", CatHung.Cát, TinhDauGroup.Lục_Cát);

    public static readonly Tả_Phù = new PhuTinh("Tả Phù", CatHung.Cát, TinhDauGroup.Lục_Cát);
    public static readonly Hữu_Bật = new PhuTinh("Hữu Bật", CatHung.Cát, TinhDauGroup.Lục_Cát);

    public static readonly Thiên_Khôi = new PhuTinh("Thiên Khôi", CatHung.Cát, TinhDauGroup.Lục_Cát);
    public static readonly Thiên_Việt = new PhuTinh("Thiên Việt", CatHung.Cát, TinhDauGroup.Lục_Cát);

    public static readonly Ân_Quang = new PhuTinh("Ân Quang", CatHung.Cát);
    public static readonly Thiên_Quý = new PhuTinh("Thiên Quý", CatHung.Cát);

    public static readonly Tam_Thai = new PhuTinh("Tam Thai", CatHung.Cát);
    public static readonly Bát_Tọa = new PhuTinh("Bát Tọa", CatHung.Cát);
    
    public static readonly Cô_Thần = new PhuTinh("Cô Thần");
    public static readonly Quả_Tú = new PhuTinh("Quả Tú");
    
    public static readonly Địa_Không = new PhuTinh("Địa Không", CatHung.Hung, TinhDauGroup.Lục_Sát);
    public static readonly Địa_Kiếp = new PhuTinh("Địa Kiếp", CatHung.Hung, TinhDauGroup.Lục_Sát);

    public static readonly Kình_Dương = new PhuTinh("Kình Dương", CatHung.Hung, TinhDauGroup.Lục_Sát);
    public static readonly Đà_La = new PhuTinh("Đà La", CatHung.Hung, TinhDauGroup.Lục_Sát);

    public static readonly Linh_Tinh = new PhuTinh("Linh Tinh", CatHung.Hung, TinhDauGroup.Lục_Sát);
    public static readonly Hỏa_Tinh = new PhuTinh("Hỏa Tinh", CatHung.Hung, TinhDauGroup.Lục_Sát);

    public static readonly Thiên_Không = new PhuTinh("Thiên Không", CatHung.Hung);

    public static readonly Đào_Hoa = new PhuTinh("Đào Hoa");
    public static readonly Hồng_Loan = new PhuTinh("Hồng Loan");
    public static readonly Thiên_Hỷ = new PhuTinh("Thiên Hỷ");

    public static readonly Thiên_Hình = new PhuTinh("Thiên Hình");
    public static readonly Thiên_Mã = new PhuTinh("Thiên Mã");

    public static readonly Long_Trì = new PhuTinh("Long Trì");
    public static readonly Phượng_Các = new PhuTinh("Phượng Các");

    public static readonly Giải_Thần = new PhuTinh("Giải Thần");

    public static readonly Thiên_Khốc = new PhuTinh("Thiên Khốc");
    public static readonly Thiên_Hư = new PhuTinh("Thiên Hư");

    public static readonly Thiên_Đức = new PhuTinh("Thiên Đức");
    public static readonly Nguyệt_Đức = new PhuTinh("Nguyệt Đức");

    public static readonly Kiếp_Sát = new PhuTinh("Kiếp Sát", CatHung.Hung);

    public static readonly Hoa_Cái = new PhuTinh("Hoa Cái");

    public static readonly Phá_Toái = new PhuTinh("Phá Toái");

    public static readonly Thiên_Riêu = new PhuTinh("Thiên Riêu");
    public static readonly Thiên_Y = new PhuTinh("Thiên Y");

    public static readonly Thiên_Giải = new PhuTinh("Thiên Giải");
    public static readonly Địa_Giải = new PhuTinh("Địa Giải");

    public static readonly Quốc_Ấn = new PhuTinh("Quốc Ấn");
    public static readonly Đường_Phù = new PhuTinh("Đường Phù");

    public static readonly Thiên_Quan = new PhuTinh("Thiên Quan");
    public static readonly Thiên_Phúc = new PhuTinh("Thiên Phúc");

    public static readonly Lưu_Hà = new PhuTinh("Lưu Hà");

    public static readonly Thiên_Trù = new PhuTinh("Thiên Trù");

    public static readonly Âm_Sát = new PhuTinh("Âm Sát");

    public static readonly TUẦN = new PhuTinh("Tuần");
    public static readonly TRIỆT = new PhuTinh("Triệt");

    public static readonly Hóa_Lộc = new PhuTinh("Hóa Lộc");
    public static readonly Hóa_Quyền = new PhuTinh("Hóa Quyền");
    public static readonly Hóa_Khoa = new PhuTinh("Hóa Khoa");
    public static readonly Hóa_Kỵ = new PhuTinh("Hóa Kỵ", CatHung.Hung);

    public static readonly tuHoa = [
        PhuTinh.Hóa_Lộc, PhuTinh.Hóa_Quyền, PhuTinh.Hóa_Khoa, PhuTinh.Hóa_Kỵ
    ];

    // Vòng Lộc Tồn
    public static readonly Lộc_Tồn = new PhuTinh("Lộc Tồn");
    public static readonly Lực_Sỹ = new PhuTinh("Lực Sỹ");
    public static readonly Thanh_Long = new PhuTinh("Thanh Long");
    public static readonly Tiểu_Hao = new PhuTinh("Tiểu Hao");
    public static readonly Tướng_Quân = new PhuTinh("Tướng Quân");
    public static readonly Tấu_Thư = new PhuTinh("Tấu Thư");
    public static readonly Phi_Liêm = new PhuTinh("Phi Liêm");
    public static readonly Hỷ_Thần = new PhuTinh("Hỷ Thần");
    public static readonly Bệnh_Phù = new PhuTinh("Bệnh Phù");
    public static readonly Đại_Hao = new PhuTinh("Đại Hao");
    public static readonly Phục_Binh = new PhuTinh("Phục Binh");
    public static readonly Quan_Phủ = new PhuTinh("Quan Phủ");
    
    public static readonly vongLocTon: PhuTinh[] = [
        PhuTinh.Lộc_Tồn, PhuTinh.Lực_Sỹ, PhuTinh.Thanh_Long, PhuTinh.Tiểu_Hao, PhuTinh.Tướng_Quân, PhuTinh.Tấu_Thư,
        PhuTinh.Phi_Liêm, PhuTinh.Hỷ_Thần, PhuTinh.Bệnh_Phù, PhuTinh.Đại_Hao, PhuTinh.Phục_Binh, PhuTinh.Quan_Phủ
    ];
    
    // Vòng Thái Tuế
    public static readonly Thái_Tuế = new PhuTinh("Thái Tuế");
    public static readonly Thiếu_Dương = new PhuTinh("Thiếu Dương");
    public static readonly Tang_Môn = new PhuTinh("Tang Môn");
    public static readonly Thiếu_Âm = new PhuTinh("Thiếu Âm");
    public static readonly Quan_Phù = new PhuTinh("Quan_Phù");
    public static readonly Tử_Phù = new PhuTinh("Tử Phù");
    public static readonly Tuế_Phá = new PhuTinh("Tuế Phá");
    public static readonly Long_Đức = new PhuTinh("Long Đức");
    public static readonly Bạch_Hổ = new PhuTinh("Bạch Hổ");
    public static readonly Phúc_Đức = new PhuTinh("Phúc Đức");
    public static readonly Điếu_Khách = new PhuTinh("Điếu Khách");
    public static readonly Trực_Phù = new PhuTinh("Trực Phù");

    public static readonly vongThaiTue: PhuTinh[] = [
        PhuTinh.Thái_Tuế, PhuTinh.Thiếu_Dương, PhuTinh.Tang_Môn, PhuTinh.Thiếu_Âm, PhuTinh.Quan_Phù, PhuTinh.Tử_Phù,
        PhuTinh.Tuế_Phá, PhuTinh.Long_Đức, PhuTinh.Bạch_Hổ, PhuTinh.Phúc_Đức, PhuTinh.Điếu_Khách, PhuTinh.Trực_Phù
    ];
    
    // Vòng Tràng Sinh
    public static readonly Trường_Sinh = new PhuTinh("Trường Sinh");
    public static readonly Mộc_Dục = new PhuTinh("Mộc Dục");
    public static readonly Quan_Đới = new PhuTinh("Quan Đới");
    public static readonly Lâm_Quan = new PhuTinh("Lâm Quan");
    public static readonly Đế_Vượng = new PhuTinh("Đế Vượng");
    public static readonly Suy = new PhuTinh("Suy");
    public static readonly Bệnh = new PhuTinh("Bệnh");
    public static readonly Tử = new PhuTinh("Tử");
    public static readonly Mộ = new PhuTinh("Mộ");
    public static readonly Tuyệt = new PhuTinh("Tuyệt");
    public static readonly Thai = new PhuTinh("Thai");
    public static readonly Dưỡng = new PhuTinh("Dưỡng");
    
    public static readonly vongTrangSinh = [
        PhuTinh.Trường_Sinh, PhuTinh.Mộc_Dục, PhuTinh.Quan_Đới, PhuTinh.Lâm_Quan, PhuTinh.Đế_Vượng, PhuTinh.Suy,
        PhuTinh.Bệnh, PhuTinh.Tử, PhuTinh.Mộ, PhuTinh.Tuyệt, PhuTinh.Thai, PhuTinh.Dưỡng
    ];

    private _name: string;
    private _type: CatHung;
    private _group: TinhDauGroup;

    constructor(name: string, type: CatHung = null, group: TinhDauGroup = null) {
        this._name = name;
        this._type = type;
        this._group = group;
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): CatHung {
        return this._type;
    }

    set type(value: CatHung) {
        this._type = value;
    }

    get group(): TinhDauGroup {
        return this._group;
    }

    set group(value: TinhDauGroup) {
        this._group = value;
    }
}