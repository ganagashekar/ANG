export const appConstants = {
    APICONTROLLER_MONITORING: 'Monitoring',
    APICONTROLLER_ACCOUNT: 'Account',
    APICONTROLLER_REFERENCE: 'v1/ReferenceRecords',

    APICONTROLLER_Admin: 'v1/Admin',

    DATE_FORMAT: 'MM/DD/YYYY',
    USERNAME_PATTERN: '[a-zA-Z0-9]{3,15}',
    PASSWORD_PATTERN: '^(?=.*[a-zA-Z])(?=.*[0-9])(?=(.*[!@#\$%\^\.&\*]){2})(?=.{8,})',
    POSITIVENUMBER_PATTERN: '^[1-9]\d*$',
    TESTMAIL_SUBJECT: 'Amazon SES test mail by Monitoring Tool',
    TESTMAIL_BODY: 'This email was sent through the Monitoring Tool'
};
