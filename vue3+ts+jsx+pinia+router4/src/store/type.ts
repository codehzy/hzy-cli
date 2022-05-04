export interface ShowAddSwitch {
  noInfect: boolean
  confirm: boolean
  dead: boolean
  heal: boolean
  nowConfirm: boolean
  nowSevere: boolean
  importedCase: boolean
  localConfirm: boolean
  localinfeciton: boolean
  all: boolean
  suspect: boolean
}

export interface Today {
  confirm: number
  isUpdated: boolean
}

export interface Total {
  nowConfirm: number
  highRiskAreaNum: number
  showRate: boolean
  adcode: string
  mediumRiskAreaNum: number
  mtime: string
  dead: number
  provinceLocalConfirm: number
  showHeal: boolean
  wzz: number
  continueDayZeroLocalConfirmAdd: number
  continueDayZeroLocalConfirm: number
  confirm: number
  heal: number
}

export interface Today {
  confirm: number
  confirmCuts: number
  isUpdated: boolean
  tip: string
  wzz_add: number
}

export interface Total {
  continueDayZeroLocalConfirmAdd: number
  confirm: number
  dead: number
  heal: number
  wzz: number
  adcode: string
  mediumRiskAreaNum: number
  mtime: string
  showRate: boolean
  provinceLocalConfirm: number
  continueDayZeroLocalConfirm: number
  nowConfirm: number
  showHeal: boolean
  highRiskAreaNum: number
}

export interface Today {
  confirm: number
  confirmCuts: number
  isUpdated: boolean
}

export interface Total {
  mediumRiskAreaNum: number
  mtime: string
  dead: number
  showHeal: boolean
  adcode: string
  nowConfirm: number
  showRate: boolean
  continueDayZeroLocalConfirmAdd: number
  wzz: number
  highRiskAreaNum: number
  continueDayZeroLocalConfirm: number
  confirm: number
  heal: number
  provinceLocalConfirm: number
}

export interface Children {
  today: Today
  total: Total
  name: string
  date: string
}

export interface Children {
  name: string
  date: string
  today: Today
  total: Total
  children: Children[]
}

export interface AreaTree {
  name: string
  today: Today
  total: Total
  children: Children[]
}

export interface ChinaTotal {
  noInfect: number
  noInfectH5: number
  nowConfirm: number
  suspect: number
  nowSevere: number
  local_acc_confirm: number
  dead: number
  importedCase: number
  localConfirm: number
  heal: number
  localConfirmH5: number
  confirm: number
  showLocalConfirm: number
  showlocalinfeciton: number
}

export interface ChinaAdd {
  nowConfirm: number
  nowSevere: number
  importedCase: number
  noInfect: number
  noInfectH5: number
  localConfirmH5: number
  confirm: number
  dead: number
  suspect: number
  localConfirm: number
  heal: number
}

export interface Diseaseh5Shelf {
  showAddSwitch: ShowAddSwitch
  areaTree: AreaTree[]
  lastUpdateTime: string
  chinaTotal: ChinaTotal
  chinaAdd: ChinaAdd
  isShowAdd: boolean
}

export interface StatisGradeCityDetail {
  confirm: number
  dead: number
  date: string
  syear: number
  province: string
  city: string
  nowConfirm: number
  mtime: string
  sdate: string
  confirmAdd: number
  heal: number
  grade: string
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf
  statisGradeCityDetail: StatisGradeCityDetail[]
}
