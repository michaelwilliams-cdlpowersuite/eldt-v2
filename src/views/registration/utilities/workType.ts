import {workTypes} from "./optionsLists";

export const getWorkTypeSelection = (apiData: any) => {
    // We'll check each of the four known API fields
    // and return matching items from the workTypes array.
    const result = [];

    if (!apiData) {
        return result;
    }

    if (apiData.enrollmentDesiredWorkLocal) {
        const localType = workTypes.find((t) => t.value === "local");
        if (localType) result.push(localType);
    }

    if (apiData.enrollmentDesiredWorkOTR) {
        const otrType = workTypes.find((t) => t.value === "otr");
        if (otrType) result.push(otrType);
    }

    if (apiData.enrollmentDesiredWorkRegional) {
        const regionalType = workTypes.find((t) => t.value === "regional");
        if (regionalType) result.push(regionalType);
    }

    if (apiData.enrollmentDesiredWorkIDC) {
        const idcType = workTypes.find((t) => t.value === "idc");
        if (idcType) result.push(idcType);
    }

    return result;
};
