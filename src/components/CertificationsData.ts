import certReactUltimate from '../assets/certs/cert_react_ultimate.png';
import certDebiReact from '../assets/certs/cert_debi_react.png';
import certJsComplete from '../assets/certs/cert_js_complete.png';
import certNodejsBootcamp from '../assets/certs/cert_nodejs_bootcamp.png';
import certIcpcAcpc from '../assets/certs/cert_icpc_acpc.png';
import certHtmlCss from '../assets/certs/cert_html_css.png';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  color: string;
  image: string;
  credentialUrl?: string;
}

export const certificationsData: Certification[] = [
  {
    id: "nodejs-bootcamp",
    name: "Node.js, Express & MongoDB: The Complete Bootcamp",
    issuer: "Udemy",
    date: "Mar 2026",
    color: "#68a063",
    image: certNodejsBootcamp,
    credentialUrl: "https://www.udemy.com/certificate/UC-60dbfe21-d45e-4344-ad4a-53b216b951f7/",
  },
  {
    id: "react-ultimate",
    name: "The Ultimate React Course 2025: React, Next.js, Redux & More",
    issuer: "Udemy",
    date: "Jan 2026",
    color: "#61DAFB",
    image: certReactUltimate,
    credentialUrl: "https://www.udemy.com/certificate/UC-ca0e8b11-641a-4f43-96e8-b83d9668e9eb/",
  },
  {
    id: "debi-react",
    name: "React Development — DEBI Round 3",
    issuer: "Digital Egypt Builders Initiative (DEBI)",
    date: "Dec 2025",
    color: "#e44d26",
    image: certDebiReact,
  },
  {
    id: "js-complete",
    name: "The Complete JavaScript Course 2025: From Zero to Expert!",
    issuer: "Udemy",
    date: "Aug 2025",
    color: "#f7df1e",
    image: certJsComplete,
    credentialUrl: "https://www.udemy.com/certificate/UC-19b521d2-eb35-4b3c-a016-90befaf3aaca/",
  },
  {
    id: "icpc-acpc",
    name: "The 2025 ICPC ACPC Kickoff Online Individual Contest",
    issuer: "ICPC",
    date: "Aug 2025",
    color: "#1e90ff",
    image: certIcpcAcpc,
  },
  {
    id: "html-css-responsive",
    name: "Build Responsive Websites — HTML & CSS",
    issuer: "Udemy",
    date: "Jul 2025",
    color: "#e44d26",
    image: certHtmlCss,
    credentialUrl: "https://www.udemy.com/certificate/UC-facc9117-be96-4481-8087-ac1ed9b0b620/",
  },
];
