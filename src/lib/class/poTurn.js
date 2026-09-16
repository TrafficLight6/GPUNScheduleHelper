// 课程字段命名转换：拼音音序(po) -> 英文(camelCase)
// 对应 Go 中 POCourseResponse 到 CourseResponse 的 POCourseResponseToCourseResponse

// po 字段 -> 英文字段 的映射表
const poToCourseMap = {
  bklxdjmc: 'courseTableTypeRegistrationName',
  cd_id: 'venueID',
  cdbh: 'venueNumber',
  cdlbmc: 'venueCategoryName',
  cdmc: 'venueName',
  cxbj: 'retakeFlag',
  date: 'date',
  dateDigit: 'dateDigit',
  dateDigitSeparator: 'dateDigitSeparator',
  day: 'day',
  jc: 'period',
  jcor: 'periodRange',
  jcs: 'periods',
  jgh: 'teacherNumber',
  jgh_id: 'teacherID',
  jgpxzd: 'teacherSortField',
  jxb_id: 'teachingClassID',
  jxbmc: 'teachingClassName',
  jxbsftkbj: 'teachingClassSuspendedFlag',
  jxbzc: 'teachingClassComposition',
  kcbj: 'courseFlag',
  kch: 'courseCode',
  kch_id: 'courseCodeID',
  kclb: 'courseCategory',
  kclbmc: 'courseCategoryName',
  kcmc: 'courseName',
  kcxszc: 'courseHoursComposition',
  kcxz: 'courseNature',
  kczxs: 'courseTotalHours',
  khfsmc: 'assessmentMethodName',
  kklxdm: 'offeringTypeCode',
  kkzt: 'offeringStatus',
  ksfsmc: 'examMethodName',
  lh: 'buildingNumber',
  listnav: 'listNav',
  localeKey: 'localeKey',
  month: 'month',
  njxh: 'gradeSequence',
  oldjc: 'oldPeriod',
  oldzc: 'oldWeek',
  pageTotal: 'pageTotal',
  pageable: 'pageable',
  pkbj: 'schedulingFlag',
  queryModel: 'queryModel',
  rangeable: 'rangeable',
  rk: 'rank',
  rsdzjs: 'headcount',
  sfjf: 'chargeFlag',
  sfkckkb: 'scheduleViewableFlag',
  skfsmc: 'teachingMethodName',
  sxbj: 'filterFlag',
  totalResult: 'totalResult',
  userModel: 'userModel',
  xf: 'credits',
  xkrs: 'enrolledCount',
  xm: 'teacherName',
  xnm: 'academicYearCode',
  xqdm: 'campusCode',
  xqh1: 'campusIDs',
  xqh_id: 'campusID',
  xqj: 'weekday',
  xqjmc: 'weekdayName',
  xqm: 'semesterCode',
  xqmc: 'campusName',
  xsdm: 'studentCode',
  xslxbj: 'studentTypeFlag',
  year: 'year',
  zcd: 'weeks',
  zcmc: 'teacherTitleName',
  zfjmc: 'teachingRoleName',
  zhxs: 'weeklyHours',
  zxs: 'totalHours',
  zyfxmc: 'majorDirectionName',
  zyhxkcbj: 'coreCourseFlag',
  zzmm: 'politicalStatus',
  zzrl: 'staffCount',
}

/**
 * 将拼音音序字段(po)的对象转换为英文字段(camelCase)的对象。
 * @param {object} po 原始拼音音序课程对象
 * @returns {object} 转换后的英文课程对象
 */
export function poCourseResponseToCourseResponse(po) {
  const result = {}
  for (const [poKey, enKey] of Object.entries(poToCourseMap)) {
    result[enKey] = po[poKey]
  }
  return result
}

export { poToCourseMap }
export default poCourseResponseToCourseResponse
