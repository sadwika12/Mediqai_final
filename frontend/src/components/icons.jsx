import React from 'react';

const Ic = ({d, size=22, sw=1.8, vb="0 0 24 24", children, ...rest}) => (
  <svg width={size} height={size} viewBox={vb} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {d ? <path d={d} /> : children}
  </svg>
);
const IconPulse = (p)=>(<Ic {...p}><path d="M2 12h4l2.2 6 3.6-14 2.4 8H21"/></Ic>);
const IconStetho = (p)=>(<Ic {...p}><path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 21a5 5 0 0 0 5-5v-3"/><circle cx="19" cy="9" r="2.4"/></Ic>);
const IconHome = (p)=>(<Ic {...p}><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v10h12V10"/></Ic>);
const IconHistory = (p)=>(<Ic {...p}><path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v4h4"/><path d="M12 8v4l3 2"/></Ic>);
const IconInfo = (p)=>(<Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r="1"/></Ic>);
const IconTips = (p)=>(<Ic {...p}><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a6 6 0 0 0-3.6 10.8c.6.46 1.1 1.2 1.1 2.2h5c0-1 .5-1.74 1.1-2.2A6 6 0 0 0 12 2Z"/></Ic>);
const IconSymptoms = (p)=>(<Ic {...p}><path d="M9 3h6l1 4H8l1-4Z"/><path d="M8 7h8l1.5 12.2A2 2 0 0 1 15.5 21h-7a2 2 0 0 1-2-1.8L8 7Z"/><path d="M9.5 12h5"/></Ic>);
const IconChat = (p)=>(<Ic {...p}><path d="M4 5h16v11H8l-4 4V5Z"/><path d="M8 9h8M8 12h5"/></Ic>);
const IconForm = (p)=>(<Ic {...p}><path d="M6 3h9l3 3v15H6V3Z"/><path d="M15 3v3h3"/><path d="M9 12h6M9 15h6M9 9h2"/></Ic>);
const IconUpload = (p)=>(<Ic {...p}><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 16v4h14v-4"/></Ic>);
const IconDroplet = (p)=>(<Ic {...p}><path d="M12 3s6.5 7.2 6.5 11.5a6.5 6.5 0 1 1-13 0C5.5 10.2 12 3 12 3Z"/></Ic>);
const IconHeart = (p)=>(<Ic {...p}><path d="M12 20s-7.5-4.6-10-9.3C.5 6.8 3 3.5 6.6 3.5c2 0 3.6 1.1 4.4 2.6.8-1.5 2.4-2.6 4.4-2.6 3.6 0 6.1 3.3 4.6 7.2C19.5 15.4 12 20 12 20Z"/><path d="M7 11h2.5l1.5-3 2 5 1.2-2H17"/></Ic>);
const IconRibbon = (p)=>(<Ic {...p}><circle cx="12" cy="7" r="4"/><path d="M9.5 10 6 21l6-3.5L18 21l-3.5-11"/></Ic>);
const IconBrain = (p)=>(<Ic {...p}><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.6A3 3 0 0 0 7 18a3 3 0 0 0 5-2V6a2 2 0 0 0-3-2Z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.6A3 3 0 0 1 17 18a3 3 0 0 1-5-2"/></Ic>);
const IconKidney = (p)=>(<Ic {...p}><path d="M9 4c-3 0-5 3-5 7s2 9 5 9c2.2 0 2-2.6 4-2.6S14.8 20 17 20c3 0 5-4 5-9s-2-7-5-7c-2.2 0-2.4 2.4-4.5 2.4S11.2 4 9 4Z"/></Ic>);
const IconLungs = (p)=>(<Ic {...p}><path d="M12 3v9"/><path d="M12 12c-1-2-3-2.5-5-1.8C4 11 3 13.5 3 16c0 2.5 1.5 4 3 4 2 0 2.5-2 3-4l1-3.2"/><path d="M12 12c1-2 3-2.5 5-1.8 3 .8 4 3.3 4 5.8 0 2.5-1.5 4-3 4-2 0-2.5-2-3-4l-1-3.2"/></Ic>);
const IconUser = (p)=>(<Ic {...p}><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c1.4-4 4.3-6 7.5-6s6.1 2 7.5 6"/></Ic>);
const IconDoctor = (p)=>(<Ic {...p}><path d="M9 3v4a3 3 0 0 0 6 0V3"/><path d="M6 5v3a6 6 0 0 0 12 0V5"/><circle cx="18" cy="16" r="3"/><path d="M4 21c.6-3 3-5 6-5"/></Ic>);
const IconAdmin = (p)=>(<Ic {...p}><path d="M12 3 4 6v6c0 4.6 3.4 8.2 8 9 4.6-.8 8-4.4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></Ic>);
const IconLogout = (p)=>(<Ic {...p}><path d="M9 4H5v16h4"/><path d="M14 8l4 4-4 4"/><path d="M18 12H9"/></Ic>);
const IconGlobe = (p)=>(<Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.8 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.8-3.8-9S9.5 5.6 12 3Z"/></Ic>);
const IconBell = (p)=>(<Ic {...p}><path d="M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/></Ic>);
const IconCheck = (p)=>(<Ic {...p}><path d="m5 12 5 5L20 6"/></Ic>);
const IconX = (p)=>(<Ic {...p}><path d="M6 6l12 12M18 6 6 18"/></Ic>);
const IconAlert = (p)=>(<Ic {...p}><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4"/><circle cx="12" cy="17" r="1"/></Ic>);
const IconArrowR = (p)=>(<Ic {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></Ic>);
const IconArrowL = (p)=>(<Ic {...p}><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></Ic>);
const IconEye = (p)=>(<Ic {...p}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></Ic>);
const IconFile = (p)=>(<Ic {...p}><path d="M7 3h7l4 4v14H7V3Z"/><path d="M14 3v4h4"/></Ic>);
const IconShield = (p)=>(<Ic {...p}><path d="M12 3 5 6v6c0 4.6 3.1 7.6 7 9 3.9-1.4 7-4.4 7-9V6l-7-3Z"/></Ic>);
const IconEdit = (p)=>(<Ic {...p}><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="M13 6l3 3"/></Ic>);
const IconLock = (p)=>(<Ic {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Ic>);
const IconMail = (p)=>(<Ic {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6 8 6 8-6"/></Ic>);
const IconMenu = (p)=>(<Ic {...p}><path d="M4 7h16M4 12h16M4 17h16"/></Ic>);
const IconActivity = (p)=>(<Ic {...p}><path d="M3 12h4l2-8 4 16 2-8h6"/></Ic>);
const IconUsers = (p)=>(<Ic {...p}><circle cx="8.5" cy="8" r="3"/><path d="M2.5 20c.8-3.4 3-5.4 6-5.4s5.2 2 6 5.4"/><circle cx="17" cy="8.5" r="2.4"/><path d="M15.7 14.8c2.2.3 3.7 2 4.3 4.4"/></Ic>);
const IconClipboard = (p)=>(<Ic {...p}><rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h6"/></Ic>);
const IconThumbUp = (p)=>(<Ic {...p}><path d="M7 11v9H4v-9h3Z"/><path d="M7 11l3.5-7a2 2 0 0 1 2 2l-.8 3.5H18a2 2 0 0 1 2 2.4l-1.4 6A2 2 0 0 1 16.6 20H10a3 3 0 0 1-3-3"/></Ic>);
const IconThumbDown = (p)=>(<Ic {...p}><path d="M17 13V4h3v9h-3Z"/><path d="M17 13l-3.5 7a2 2 0 0 1-2-2l.8-3.5H6a2 2 0 0 1-2-2.4l1.4-6A2 2 0 0 1 7.4 4H14a3 3 0 0 1 3 3"/></Ic>);
const IconSearch = (p)=>(<Ic {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Ic>);
const IconSettings = (p)=>(<Ic {...p}><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19.5a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H4.5a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 6.15 9.4a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H10.6A1.7 1.7 0 0 0 11.64 3.5V3.44a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 16.68 5.1a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.06a1.7 1.7 0 0 0 1.56 1.04h.09a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.04Z"/></Ic>);
const IconCake = (p)=>(<Ic {...p}><path d="M4 21v-6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6"/><path d="M4 17h16"/><path d="M9 12V7M12 12V5M15 12V7"/><circle cx="12" cy="3" r="1"/></Ic>);
const IconDna = (p)=>(<Ic {...p}><path d="M7 3c0 5 10 5 10 9s-10 4-10 9"/><path d="M17 3c0 5-10 5-10 9s10 4 10 9"/><path d="M8 7h8M7.5 12h9M8 17h8"/></Ic>);
const IconBook = (p)=>(<Ic {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"/></Ic>);
const IconMicroscope = (p)=>(<Ic {...p}><path d="M9 21h8"/><path d="M11 21v-4a4 4 0 0 1 4-4"/><circle cx="9" cy="9" r="4"/><path d="M6.5 6.5 4 4"/><path d="M13 13l3 3"/><path d="M16 3l3 3-3.5 3.5-3-3Z"/></Ic>);
const IconHelp = (p)=>(<Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M9.2 9.2a2.8 2.8 0 1 1 3.8 2.6c-.9.4-1 1.1-1 2"/><circle cx="12" cy="17.2" r="1"/></Ic>);

const IconSun = (p)=>(<Ic {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></Ic>);
const IconMoon = (p)=>(<Ic {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></Ic>);
const IconChevronDown = (p)=>(<Ic {...p}><path d="m6 9 6 6 6-6"/></Ic>);
const IconArrowUp = (p)=>(<Ic {...p}><path d="M12 19V5"/><path d="m6 11 6-6 6 6"/></Ic>);

const IconApple = (p)=>(<Ic {...p}><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></Ic>);
const IconCookie = (p)=>(<Ic {...p}><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></Ic>);
const IconUserCheck = (p)=>(<Ic {...p}><path d="m16 11 2 2 4-4"/><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/></Ic>);
const IconSparkles = (p)=>(<Ic {...p}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></Ic>);
const IconSend = (p)=>(<Ic {...p}><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7Z"/></Ic>);
const IconCheckCircle = (p)=>(<Ic {...p}><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></Ic>);
const IconAlertCircle = (p)=>(<Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/></Ic>);
const IconShieldAlert = (p)=>(<Ic {...p}><path d="M12 3 5 6v6c0 4.6 3.1 7.6 7 9 3.9-1.4 7-4.4 7-9V6l-7-3Z"/><path d="M12 8v4"/><path d="M12 16h.01"/></Ic>);

const IconTrash = (p)=>(<Ic {...p}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></Ic>);

export { Ic,IconPulse,IconStetho,IconHome,IconHistory,IconInfo,IconTips,IconSymptoms,IconChat,IconForm,IconUpload,IconDroplet,IconHeart,IconRibbon,IconBrain,IconKidney,IconLungs,IconUser,IconDoctor,IconAdmin,IconLogout,IconGlobe,IconBell,IconCheck,IconX,IconAlert,IconArrowR,IconArrowL,IconEye,IconFile,IconShield,IconEdit,IconLock,IconMail,IconMenu,IconActivity,IconUsers,IconClipboard,IconThumbUp,IconThumbDown,IconSearch,IconSettings,IconCake,IconDna,IconBook,IconMicroscope,IconHelp,IconSun,IconMoon,IconChevronDown,IconArrowUp,
  IconApple,IconCookie,IconUserCheck,IconSparkles,IconSend,IconCheckCircle,IconAlertCircle,IconShieldAlert,IconTrash };
