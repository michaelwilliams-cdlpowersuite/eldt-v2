import {workTypes} from "./optionsLists";

export const getWorkTypeSelection = (api: any) => {
    // We'll check each of the four known API fields
    // and return matching items from the workTypes array.
    const result = [];

    if (api.enrollmentDesiredWorkLocal) {
        const localType = workTypes.find((t) => t.value === "local");
        if (localType) result.push(localType);
    }

    if (api.enrollmentDesiredWorkOTR) {
        const otrType = workTypes.find((t) => t.value === "otr");
        if (otrType) result.push(otrType);
    }

    if (api.enrollmentDesiredWorkRegional) {
        const regionalType = workTypes.find((t) => t.value === "regional");
        if (regionalType) result.push(regionalType);
    }

    if (api.enrollmentDesiredWorkIDC) {
        const idcType = workTypes.find((t) => t.value === "idc");
        if (idcType) result.push(idcType);
    }

    return result;
};
