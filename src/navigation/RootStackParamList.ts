export enum RouteName {
  STARTUP = 'Startup',
  DASHBOARD = 'Dashboard',
}
export type RootStackParamList = {
  [RouteName.STARTUP]: undefined;
  [RouteName.DASHBOARD]: undefined;
};
