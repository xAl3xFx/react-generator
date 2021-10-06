import "react";

declare module 'react' {
    export interface HTMLAttributes<T> {
        name?: any;
    }
}
export interface Company {
    CompanyID: number,
    CompanyName: string,
    CompanyCode: string,
    CompanyDetails: string,
    CompanyType: string,
    nameC: string,
    nameE: string,
    idNumber: number,
    virtualIBAN: string,
    IBAN: string,
    address: string,
    corAddress: string,
    phone: string,
    email: string[],
    ACER: string,
    LEI: string,
    MIC: string,
    EIC: string,
    broker: string,
    master: boolean,
    rateId: number,
    active: boolean,
    registrationDate?: Date,
    unRegistrationDate?: Date,
    representative? : Staff,
    accountant? : Staff
}

export interface Staff {
    id? : number,
    name? : string, 
    email? : string,
    phone?: string,
    positionId?: number
}

export interface Nomenclature {
    key: number,
    value: number,
    label: string
}

export interface WalletInterface {
    totalBalance: number,
    freeDeposit: number,
    blockedByOrders: number,
    blockedByTrades: number,
    blockedByTaxes: number,
    blockedByAuctions: number
}

export interface Instrument {
    InstID: number,
    InstType: string,
    InstCode: string,
    InstName: string,
    DerivedFrom? : number
}

export interface Product {
    SeqID: number,
    SeqName: string
}

export interface Collateral {
    InstID: number,
    SeqID: number,
    percentForBid: number,
    percentForAsk: number
}

export interface User {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    userRoleId: number,
    enabled: boolean,
    id? : string
}

export interface SiteUser {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    companyId: number,
    enabled: boolean,
    id? : string
}

export interface Role {
    key: string,
    label: string,
    value: string
}

export interface RoleObject {
    [key:string] : string
}