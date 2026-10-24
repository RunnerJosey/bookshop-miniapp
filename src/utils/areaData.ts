// 中国省市区三级联动数据
export interface AreaData {
  name: string;
  code: string;
  children?: CityData[];
}

export interface CityData {
  name: string;
  code: string;
  children?: DistrictData[];
}

export interface DistrictData {
  name: string;
  code: string;
}

// 简化的省市区数据（示例）
// 实际项目中可以从外部数据源导入完整的数据
export const areaData: AreaData[] = [
  {
    name: "北京市",
    code: "110000",
    children: [
      {
        name: "北京市",
        code: "110100",
        children: [
          { name: "东城区", code: "110101" },
          { name: "西城区", code: "110102" },
          { name: "朝阳区", code: "110105" },
          { name: "丰台区", code: "110106" },
          { name: "石景山区", code: "110107" },
          { name: "海淀区", code: "110108" },
          { name: "门头沟区", code: "110109" },
          { name: "房山区", code: "110111" },
          { name: "通州区", code: "110112" },
          { name: "顺义区", code: "110113" },
          { name: "昌平区", code: "110114" },
          { name: "大兴区", code: "110115" },
          { name: "怀柔区", code: "110116" },
          { name: "平谷区", code: "110117" },
          { name: "密云区", code: "110118" },
          { name: "延庆区", code: "110119" }
        ]
      }
    ]
  },
  {
    name: "天津市",
    code: "120000",
    children: [
      {
        name: "天津市",
        code: "120100",
        children: [
          { name: "和平区", code: "120101" },
          { name: "河东区", code: "120102" },
          { name: "河西区", code: "120103" },
          { name: "南开区", code: "120104" },
          { name: "河北区", code: "120105" },
          { name: "红桥区", code: "120106" },
          { name: "东丽区", code: "120110" },
          { name: "西青区", code: "120111" },
          { name: "津南区", code: "120112" },
          { name: "北辰区", code: "120113" },
          { name: "武清区", code: "120114" },
          { name: "宝坻区", code: "120115" },
          { name: "滨海新区", code: "120116" },
          { name: "宁河区", code: "120117" },
          { name: "静海区", code: "120118" },
          { name: "蓟州区", code: "120119" }
        ]
      }
    ]
  },
  {
    name: "河北省",
    code: "130000",
    children: [
      {
        name: "石家庄市",
        code: "130100",
        children: [
          { name: "长安区", code: "130102" },
          { name: "桥西区", code: "130104" },
          { name: "新华区", code: "130105" },
          { name: "井陉矿区", code: "130107" },
          { name: "裕华区", code: "130108" },
          { name: "藁城区", code: "130109" },
          { name: "鹿泉区", code: "130110" },
          { name: "栾城区", code: "130111" },
          { name: "井陉县", code: "130121" },
          { name: "正定县", code: "130123" },
          { name: "行唐县", code: "130125" },
          { name: "灵寿县", code: "130126" },
          { name: "高邑县", code: "130127" },
          { name: "深泽县", code: "130128" },
          { name: "赞皇县", code: "130129" },
          { name: "无极县", code: "130130" },
          { name: "平山县", code: "130131" },
          { name: "元氏县", code: "130132" },
          { name: "赵县", code: "130133" },
          { name: "辛集市", code: "130181" },
          { name: "晋州市", code: "130183" },
          { name: "新乐市", code: "130184" }
        ]
      },
      {
        name: "唐山市",
        code: "130200",
        children: [
          { name: "路南区", code: "130202" },
          { name: "路北区", code: "130203" },
          { name: "古冶区", code: "130204" },
          { name: "开平区", code: "130205" },
          { name: "丰南区", code: "130207" },
          { name: "丰润区", code: "130208" },
          { name: "曹妃甸区", code: "130209" },
          { name: "滦南县", code: "130224" },
          { name: "乐亭县", code: "130225" },
          { name: "迁西县", code: "130227" },
          { name: "玉田县", code: "130229" },
          { name: "遵化市", code: "130281" },
          { name: "迁安市", code: "130283" },
          { name: "滦州市", code: "130284" }
        ]
      }
    ]
  },
  {
    name: "山西省",
    code: "140000",
    children: [
      {
        name: "太原市",
        code: "140100",
        children: [
          { name: "小店区", code: "140105" },
          { name: "迎泽区", code: "140106" },
          { name: "杏花岭区", code: "140107" },
          { name: "尖草坪区", code: "140108" },
          { name: "万柏林区", code: "140109" },
          { name: "晋源区", code: "140110" },
          { name: "清徐县", code: "140121" },
          { name: "阳曲县", code: "140122" },
          { name: "娄烦县", code: "140123" },
          { name: "古交市", code: "140181" }
        ]
      }
    ]
  },
  {
    name: "内蒙古自治区",
    code: "150000",
    children: [
      {
        name: "呼和浩特市",
        code: "150100",
        children: [
          { name: "新城区", code: "150102" },
          { name: "回民区", code: "150103" },
          { name: "玉泉区", code: "150104" },
          { name: "赛罕区", code: "150105" },
          { name: "土默特左旗", code: "150121" },
          { name: "托克托县", code: "150122" },
          { name: "和林格尔县", code: "150123" },
          { name: "清水河县", code: "150124" },
          { name: "武川县", code: "150125" }
        ]
      }
    ]
  },
  {
    name: "辽宁省",
    code: "210000",
    children: [
      {
        name: "沈阳市",
        code: "210100",
        children: [
          { name: "和平区", code: "210102" },
          { name: "沈河区", code: "210103" },
          { name: "大东区", code: "210104" },
          { name: "皇姑区", code: "210105" },
          { name: "铁西区", code: "210106" },
          { name: "苏家屯区", code: "210111" },
          { name: "浑南区", code: "210112" },
          { name: "沈北新区", code: "210113" },
          { name: "于洪区", code: "210114" },
          { name: "辽中区", code: "210115" },
          { name: "康平县", code: "210123" },
          { name: "法库县", code: "210124" },
          { name: "新民市", code: "210181" }
        ]
      }
    ]
  },
  {
    name: "吉林省",
    code: "220000",
    children: [
      {
        name: "长春市",
        code: "220100",
        children: [
          { name: "南关区", code: "220102" },
          { name: "宽城区", code: "220103" },
          { name: "朝阳区", code: "220104" },
          { name: "二道区", code: "220105" },
          { name: "绿园区", code: "220106" },
          { name: "双阳区", code: "220112" },
          { name: "九台区", code: "220113" },
          { name: "农安县", code: "220122" },
          { name: "榆树市", code: "220182" },
          { name: "德惠市", code: "220183" }
        ]
      }
    ]
  },
  {
    name: "黑龙江省",
    code: "230000",
    children: [
      {
        name: "哈尔滨市",
        code: "230100",
        children: [
          { name: "道里区", code: "230102" },
          { name: "南岗区", code: "230103" },
          { name: "道外区", code: "230104" },
          { name: "平房区", code: "230108" },
          { name: "松北区", code: "230109" },
          { name: "香坊区", code: "230110" },
          { name: "呼兰区", code: "230111" },
          { name: "阿城区", code: "230112" },
          { name: "双城区", code: "230113" },
          { name: "依兰县", code: "230123" },
          { name: "方正县", code: "230124" },
          { name: "宾县", code: "230125" },
          { name: "巴彦县", code: "230126" },
          { name: "木兰县", code: "230127" },
          { name: "通河县", code: "230128" },
          { name: "延寿县", code: "230129" },
          { name: "尚志市", code: "230183" },
          { name: "五常市", code: "230184" }
        ]
      }
    ]
  },
  {
    name: "上海市",
    code: "310000",
    children: [
      {
        name: "上海市",
        code: "310100",
        children: [
          { name: "黄浦区", code: "310101" },
          { name: "徐汇区", code: "310104" },
          { name: "长宁区", code: "310105" },
          { name: "静安区", code: "310106" },
          { name: "普陀区", code: "310107" },
          { name: "虹口区", code: "310109" },
          { name: "杨浦区", code: "310110" },
          { name: "闵行区", code: "310112" },
          { name: "宝山区", code: "310113" },
          { name: "嘉定区", code: "310114" },
          { name: "浦东新区", code: "310115" },
          { name: "金山区", code: "310116" },
          { name: "松江区", code: "310117" },
          { name: "青浦区", code: "310118" },
          { name: "奉贤区", code: "310120" },
          { name: "崇明区", code: "310151" }
        ]
      }
    ]
  },
  {
    name: "江苏省",
    code: "320000",
    children: [
      {
        name: "南京市",
        code: "320100",
        children: [
          { name: "玄武区", code: "320102" },
          { name: "秦淮区", code: "320104" },
          { name: "建邺区", code: "320105" },
          { name: "鼓楼区", code: "320106" },
          { name: "浦口区", code: "320111" },
          { name: "栖霞区", code: "320113" },
          { name: "雨花台区", code: "320114" },
          { name: "江宁区", code: "320115" },
          { name: "六合区", code: "320116" },
          { name: "溧水区", code: "320117" },
          { name: "高淳区", code: "320118" }
        ]
      }
    ]
  },
  {
    name: "浙江省",
    code: "330000",
    children: [
      {
        name: "杭州市",
        code: "330100",
        children: [
          { name: "上城区", code: "330102" },
          { name: "下城区", code: "330103" },
          { name: "江干区", code: "330104" },
          { name: "拱墅区", code: "330105" },
          { name: "西湖区", code: "330106" },
          { name: "滨江区", code: "330108" },
          { name: "萧山区", code: "330109" },
          { name: "余杭区", code: "330110" },
          { name: "富阳区", code: "330111" },
          { name: "临安区", code: "330112" },
          { name: "桐庐县", code: "330122" },
          { name: "淳安县", code: "330127" },
          { name: "建德市", code: "330182" }
        ]
      }
    ]
  },
  {
    name: "安徽省",
    code: "340000",
    children: [
      {
        name: "合肥市",
        code: "340100",
        children: [
          { name: "瑶海区", code: "340102" },
          { name: "庐阳区", code: "340103" },
          { name: "蜀山区", code: "340104" },
          { name: "包河区", code: "340111" },
          { name: "长丰县", code: "340121" },
          { name: "肥东县", code: "340122" },
          { name: "肥西县", code: "340123" },
          { name: "庐江县", code: "340124" },
          { name: "巢湖市", code: "340181" }
        ]
      }
    ]
  },
  {
    name: "福建省",
    code: "350000",
    children: [
      {
        name: "福州市",
        code: "350100",
        children: [
          { name: "鼓楼区", code: "350102" },
          { name: "台江区", code: "350103" },
          { name: "仓山区", code: "350104" },
          { name: "马尾区", code: "350105" },
          { name: "晋安区", code: "350111" },
          { name: "长乐区", code: "350112" },
          { name: "闽侯县", code: "350121" },
          { name: "连江县", code: "350122" },
          { name: "罗源县", code: "350123" },
          { name: "闽清县", code: "350124" },
          { name: "永泰县", code: "350125" },
          { name: "平潭县", code: "350128" },
          { name: "福清市", code: "350181" }
        ]
      }
    ]
  },
  {
    name: "江西省",
    code: "360000",
    children: [
      {
        name: "南昌市",
        code: "360100",
        children: [
          { name: "东湖区", code: "360102" },
          { name: "西湖区", code: "360103" },
          { name: "青云谱区", code: "360104" },
          { name: "湾里区", code: "360105" },
          { name: "青山湖区", code: "360111" },
          { name: "新建区", code: "360112" },
          { name: "南昌县", code: "360121" },
          { name: "安义县", code: "360123" },
          { name: "进贤县", code: "360124" }
        ]
      }
    ]
  },
  {
    name: "山东省",
    code: "370000",
    children: [
      {
        name: "济南市",
        code: "370100",
        children: [
          { name: "历下区", code: "370102" },
          { name: "市中区", code: "370103" },
          { name: "槐荫区", code: "370104" },
          { name: "天桥区", code: "370105" },
          { name: "历城区", code: "370112" },
          { name: "长清区", code: "370113" },
          { name: "章丘区", code: "370114" },
          { name: "济阳区", code: "370115" },
          { name: "莱芜区", code: "370116" },
          { name: "钢城区", code: "370117" },
          { name: "平阴县", code: "370124" },
          { name: "商河县", code: "370126" }
        ]
      }
    ]
  },
  {
    name: "河南省",
    code: "410000",
    children: [
      {
        name: "郑州市",
        code: "410100",
        children: [
          { name: "中原区", code: "410102" },
          { name: "二七区", code: "410103" },
          { name: "管城回族区", code: "410104" },
          { name: "金水区", code: "410105" },
          { name: "上街区", code: "410106" },
          { name: "惠济区", code: "410108" },
          { name: "中牟县", code: "410122" },
          { name: "巩义市", code: "410181" },
          { name: "荥阳市", code: "410182" },
          { name: "新密市", code: "410183" },
          { name: "新郑市", code: "410184" },
          { name: "登封市", code: "410185" }
        ]
      }
    ]
  },
  {
    name: "湖北省",
    code: "420000",
    children: [
      {
        name: "武汉市",
        code: "420100",
        children: [
          { name: "江岸区", code: "420102" },
          { name: "江汉区", code: "420103" },
          { name: "硚口区", code: "420104" },
          { name: "汉阳区", code: "420105" },
          { name: "武昌区", code: "420106" },
          { name: "青山区", code: "420107" },
          { name: "洪山区", code: "420111" },
          { name: "东西湖区", code: "420112" },
          { name: "汉南区", code: "420113" },
          { name: "蔡甸区", code: "420114" },
          { name: "江夏区", code: "420115" },
          { name: "黄陂区", code: "420116" },
          { name: "新洲区", code: "420117" }
        ]
      }
    ]
  },
  {
    name: "湖南省",
    code: "430000",
    children: [
      {
        name: "长沙市",
        code: "430100",
        children: [
          { name: "芙蓉区", code: "430102" },
          { name: "天心区", code: "430103" },
          { name: "岳麓区", code: "430104" },
          { name: "开福区", code: "430105" },
          { name: "雨花区", code: "430111" },
          { name: "望城区", code: "430112" },
          { name: "长沙县", code: "430121" },
          { name: "浏阳市", code: "430181" },
          { name: "宁乡市", code: "430182" }
        ]
      }
    ]
  },
  {
    name: "广东省",
    code: "440000",
    children: [
      {
        name: "广州市",
        code: "440100",
        children: [
          { name: "荔湾区", code: "440103" },
          { name: "越秀区", code: "440104" },
          { name: "海珠区", code: "440105" },
          { name: "天河区", code: "440106" },
          { name: "白云区", code: "440111" },
          { name: "黄埔区", code: "440112" },
          { name: "番禺区", code: "440113" },
          { name: "花都区", code: "440114" },
          { name: "南沙区", code: "440115" },
          { name: "从化区", code: "440117" },
          { name: "增城区", code: "440118" }
        ]
      },
      {
        name: "深圳市",
        code: "440300",
        children: [
          { name: "罗湖区", code: "440303" },
          { name: "福田区", code: "440304" },
          { name: "南山区", code: "440305" },
          { name: "宝安区", code: "440306" },
          { name: "龙岗区", code: "440307" },
          { name: "盐田区", code: "440308" },
          { name: "龙华区", code: "440309" },
          { name: "坪山区", code: "440310" },
          { name: "光明区", code: "440311" }
        ]
      }
    ]
  },
  {
    name: "广西壮族自治区",
    code: "450000",
    children: [
      {
        name: "南宁市",
        code: "450100",
        children: [
          { name: "兴宁区", code: "450102" },
          { name: "青秀区", code: "450103" },
          { name: "江南区", code: "450105" },
          { name: "西乡塘区", code: "450107" },
          { name: "良庆区", code: "450108" },
          { name: "邕宁区", code: "450109" },
          { name: "武鸣区", code: "450110" },
          { name: "隆安县", code: "450123" },
          { name: "马山县", code: "450124" },
          { name: "上林县", code: "450125" },
          { name: "宾阳县", code: "450126" },
          { name: "横县", code: "450127" }
        ]
      }
    ]
  },
  {
    name: "海南省",
    code: "460000",
    children: [
      {
        name: "海口市",
        code: "460100",
        children: [
          { name: "秀英区", code: "460105" },
          { name: "龙华区", code: "460106" },
          { name: "琼山区", code: "460107" },
          { name: "美兰区", code: "460108" }
        ]
      }
    ]
  },
  {
    name: "重庆市",
    code: "500000",
    children: [
      {
        name: "重庆市",
        code: "500100",
        children: [
          { name: "万州区", code: "500101" },
          { name: "涪陵区", code: "500102" },
          { name: "渝中区", code: "500103" },
          { name: "大渡口区", code: "500104" },
          { name: "江北区", code: "500105" },
          { name: "沙坪坝区", code: "500106" },
          { name: "九龙坡区", code: "500107" },
          { name: "南岸区", code: "500108" },
          { name: "北碚区", code: "500109" },
          { name: "綦江区", code: "500110" },
          { name: "大足区", code: "500111" },
          { name: "渝北区", code: "500112" },
          { name: "巴南区", code: "500113" },
          { name: "黔江区", code: "500114" },
          { name: "长寿区", code: "500115" },
          { name: "江津区", code: "500116" },
          { name: "合川区", code: "500117" },
          { name: "永川区", code: "500118" },
          { name: "南川区", code: "500119" },
          { name: "璧山区", code: "500120" },
          { name: "铜梁区", code: "500151" },
          { name: "潼南区", code: "500152" },
          { name: "荣昌区", code: "500153" },
          { name: "开州区", code: "500154" },
          { name: "梁平区", code: "500155" },
          { name: "武隆区", code: "500156" }
        ]
      }
    ]
  },
  {
    name: "四川省",
    code: "510000",
    children: [
      {
        name: "成都市",
        code: "510100",
        children: [
          { name: "锦江区", code: "510104" },
          { name: "青羊区", code: "510105" },
          { name: "金牛区", code: "510106" },
          { name: "武侯区", code: "510107" },
          { name: "成华区", code: "510108" },
          { name: "龙泉驿区", code: "510112" },
          { name: "青白江区", code: "510113" },
          { name: "新都区", code: "510114" },
          { name: "温江区", code: "510115" },
          { name: "双流区", code: "510116" },
          { name: "郫都区", code: "510117" },
          { name: "新津区", code: "510118" },
          { name: "金堂县", code: "510121" },
          { name: "大邑县", code: "510129" },
          { name: "蒲江县", code: "510131" },
          { name: "都江堰市", code: "510181" },
          { name: "彭州市", code: "510182" },
          { name: "邛崃市", code: "510183" },
          { name: "崇州市", code: "510184" },
          { name: "简阳市", code: "510185" }
        ]
      }
    ]
  },
  {
    name: "贵州省",
    code: "520000",
    children: [
      {
        name: "贵阳市",
        code: "520100",
        children: [
          { name: "南明区", code: "520102" },
          { name: "云岩区", code: "520103" },
          { name: "花溪区", code: "520111" },
          { name: "乌当区", code: "520112" },
          { name: "白云区", code: "520113" },
          { name: "观山湖区", code: "520115" },
          { name: "开阳县", code: "520121" },
          { name: "息烽县", code: "520122" },
          { name: "修文县", code: "520123" },
          { name: "清镇市", code: "520181" }
        ]
      }
    ]
  },
  {
    name: "云南省",
    code: "530000",
    children: [
      {
        name: "昆明市",
        code: "530100",
        children: [
          { name: "五华区", code: "530102" },
          { name: "盘龙区", code: "530103" },
          { name: "官渡区", code: "530111" },
          { name: "西山区", code: "530112" },
          { name: "东川区", code: "530113" },
          { name: "呈贡区", code: "530114" },
          { name: "晋宁区", code: "530115" },
          { name: "富民县", code: "530124" },
          { name: "宜良县", code: "530125" },
          { name: "石林彝族自治县", code: "530126" },
          { name: "嵩明县", code: "530127" },
          { name: "禄劝彝族苗族自治县", code: "530128" },
          { name: "寻甸回族彝族自治县", code: "530129" },
          { name: "安宁市", code: "530181" }
        ]
      }
    ]
  },
  {
    name: "西藏自治区",
    code: "540000",
    children: [
      {
        name: "拉萨市",
        code: "540100",
        children: [
          { name: "城关区", code: "540102" },
          { name: "堆龙德庆区", code: "540103" },
          { name: "达孜区", code: "540104" },
          { name: "林周县", code: "540121" },
          { name: "当雄县", code: "540122" },
          { name: "尼木县", code: "540123" },
          { name: "曲水县", code: "540124" },
          { name: "墨竹工卡县", code: "540127" }
        ]
      }
    ]
  },
  {
    name: "陕西省",
    code: "610000",
    children: [
      {
        name: "西安市",
        code: "610100",
        children: [
          { name: "新城区", code: "610102" },
          { name: "碑林区", code: "610103" },
          { name: "莲湖区", code: "610104" },
          { name: "灞桥区", code: "610111" },
          { name: "未央区", code: "610112" },
          { name: "雁塔区", code: "610113" },
          { name: "阎良区", code: "610114" },
          { name: "临潼区", code: "610115" },
          { name: "长安区", code: "610116" },
          { name: "高陵区", code: "610117" },
          { name: "鄠邑区", code: "610118" },
          { name: "蓝田县", code: "610122" },
          { name: "周至县", code: "610124" }
        ]
      }
    ]
  },
  {
    name: "甘肃省",
    code: "620000",
    children: [
      {
        name: "兰州市",
        code: "620100",
        children: [
          { name: "城关区", code: "620102" },
          { name: "七里河区", code: "620103" },
          { name: "西固区", code: "620104" },
          { name: "安宁区", code: "620105" },
          { name: "红古区", code: "620111" },
          { name: "永登县", code: "620121" },
          { name: "皋兰县", code: "620122" },
          { name: "榆中县", code: "620123" }
        ]
      }
    ]
  },
  {
    name: "青海省",
    code: "630000",
    children: [
      {
        name: "西宁市",
        code: "630100",
        children: [
          { name: "城东区", code: "630102" },
          { name: "城中区", code: "630103" },
          { name: "城西区", code: "630104" },
          { name: "城北区", code: "630105" },
          { name: "大通回族土族自治县", code: "630121" },
          { name: "湟中区", code: "630122" },
          { name: "湟源县", code: "630123" }
        ]
      }
    ]
  },
  {
    name: "宁夏回族自治区",
    code: "640000",
    children: [
      {
        name: "银川市",
        code: "640100",
        children: [
          { name: "兴庆区", code: "640104" },
          { name: "西夏区", code: "640105" },
          { name: "金凤区", code: "640106" },
          { name: "永宁县", code: "640121" },
          { name: "贺兰县", code: "640122" },
          { name: "灵武市", code: "640181" }
        ]
      }
    ]
  },
  {
    name: "新疆维吾尔自治区",
    code: "650000",
    children: [
      {
        name: "乌鲁木齐市",
        code: "650100",
        children: [
          { name: "天山区", code: "650102" },
          { name: "沙依巴克区", code: "650103" },
          { name: "新市区", code: "650104" },
          { name: "水磨沟区", code: "650105" },
          { name: "头屯河区", code: "650106" },
          { name: "达坂城区", code: "650107" },
          { name: "米东区", code: "650109" },
          { name: "乌鲁木齐县", code: "650121" }
        ]
      }
    ]
  }
];