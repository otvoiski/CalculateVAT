import * as yup from "yup";

export const vatSchema = yup
    .object({
        priceWithoutVat: yup.number().label("Price without VAT").positive().required(),
        valueAddedTax: yup.number().label("Value-Added Tax").moreThan(-1).required(),
        priceIncludedVat: yup.number().label("Price incl. VAT").moreThan(-1).required(),
    })
    .required();