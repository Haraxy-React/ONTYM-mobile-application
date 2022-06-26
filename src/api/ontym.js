import { exp } from "react-native-reanimated";
import { apiUrl } from "../../env/index.js";
//  ***************  API ****************
export const taskList = `${apiUrl}/jobs`
export const staffDetails = `${apiUrl}/staff`
export const locationList = `${apiUrl}/location`
export const jobDurationUrl = `${apiUrl}/job-durations`
export const jobStatusUrl = `${apiUrl}/job-status`
export const propertyUrl = `${apiUrl}/property`
export const staffUrl = `${apiUrl}/staff`
export const jobType = `${apiUrl}/job-types`
export const jobSource = `${apiUrl}/job-sources`;
export const areaOfHouse = `${apiUrl}/area-of-houses`;
export const causeOfIssue = `${apiUrl}/cause-of-issues`;

// ********* question api ********* //
export const question = `${apiUrl}/question`;
// ********* audit api ********* //
export const audit = `${apiUrl}/audits`;
export const auditCustom = `${apiUrl}/audits/v2`;
export const subInventoryAudit = `${apiUrl}/inventory-audits`;
// ********* inventory api ********* //
export const inventory = `${apiUrl}/inventory`
export const subInventory = `${apiUrl}/subInventory`

// ********* amcPurchase api ********* //
export const amcPurchase = `${apiUrl}/amcPurchase`;

// ********** BOOKING ************//
export const bookingApi = `${apiUrl}/booking`;

// ********** BILLING CATEGORY ***********//
export const billingCategory = `${apiUrl}/subamcs`;
export const billingSubCategory = `${apiUrl}/subsubamc`;

export const uploadFile = `${apiUrl}/upload`;

// ********** BANK ***********//
export const bankApi = `${apiUrl}/bank`;

// ********** EMAIL ***********//
export const sendEmail = `${apiUrl}/sendSingle`;

export const ping = `${apiUrl}/ping`;

