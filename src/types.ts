export type WithChildren<T> = T & { children?: React.ReactNode }
export type FCC = React.FC<WithChildren<{}>>
