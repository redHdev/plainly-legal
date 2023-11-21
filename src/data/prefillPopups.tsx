//This document holds all popup JSX that is used in the prefilling process

import Link from "next/link";


// Company Name Popup
export const companyName = (
<div>
    <p>
    {`We'll use this information to fill in things like "company name" and "coach name" in the legal documents you create. Your answer needs to be either your personal name or the name of the legal entity you created for your business. Legally, a contract is between two or more people (and we count corporate entities as people).`}
    </p>
    <p>
    {`If you have a registered business, you'll use that. And if you have a DBA, you'll include that. For example, our agreements use "Your Online Genius LLC dba Plainly Legal™" as the company name.`}
    </p>
    <p>
    {`If you don't have a registered business name, put your personal name here. However, we highly recommend you set up a registered business entity.`}
    </p>
    <p><Link target="_blank" href="https://help.plainlylegal.com/what-should-i-use-for-my-business-name">What should I use for my company name?</Link></p>
</div>
);

// Signer Name Popup
export const signerName = (
<div>
    <p>
    {`We’ll use this information to fill in the name of the person signing agreements on behalf of your company. Use the name you will use to sign agreements. If more than one person will sign agreements on behalf of your company, you should leave this section blank.`}
    </p>
</div>
);

// Contact Email Address Popup
export const contactEmail = (
<div>
    <p>
    {`In some legal documents, you’ll need to provide an email address. For example, you’ll provide an email address where people can contact you about your privacy policy or to request a refund (if you allow them). We’ll use the email address you provide here to prefill all the email addresses in your legal documents. Normally, this will be a generic email address (e.g., “admin@mycompany.com” or “support@mycompany.com”).`}
    </p>
</div>
);

// Business Address Popup
export const businessAddress = (
<div>
    <p>
    {`Certain legal documents will require you to provide contact information. We’ll use the information you fill in here to populate your contact address. If your physical and mailing addresses are different, use your mailing address here.`}
    </p>
</div>
);

// Choice of Law Popup
export const choiceOfLaw = (
<div>
    <p>
    {`A choice of law clause defines which state’s laws apply to a contract (and to any dispute that arises related to that contract). It’s generally a good idea to include one of these clauses to avoid a dispute about this foundational issue. You can pick any state you want, but the most common practice is to simply pick your home state for the choice of law.`}
    </p>
</div>
);

// Arbitration vs. Court Proceeding Popup
export const arbitrationVsCourt = (
<div>
    <p>
    {`Now, let’s decide whether you want disputes decided in court or by a private arbitrator. The default is to have disputes decided by a court. This is what you probably think of when you think of a lawsuit. There will be a judge and maybe a jury that will decide who wins the dispute.`}
    </p>
    <p>
    {`Arbitration is a process where the parties hire a private person (generally a lawyer) to decide the outcome of a dispute rather than going to court. Under Federal law, the parties to a contract can choose arbitration as the only forum to decide disputes.`}
    </p>
    <p>
    {`If you opt for arbitration, the parties will have to pay for the arbitrator to decide the dispute, but there are some offsetting advantages. First, arbitration is generally much quicker and more streamlined than going to court. Second, you can require disputes to be arbitrated individually. This means you won’t be subject to having students form a “class action” to bring their claims in a single action. This will often prevent people from filing a claim in the first place because it will cost too much compared to what they might get back.`}
    </p>
    <p><Link target="_blank" href="https://help.plainlylegal.com/which-dispute-resolution-option-should-i-choose">Which dispute resolution option should I choose? </Link></p>

</div>
);

// Dispute Location Popup
export const disputeLocation = (
<div>
    <p>
    {`As part of a contract, you can include a clause that requires all disputes to be resolved in a particular physical location (whether you chose arbitration or court proceedings). Most often people list a City, State combination (but you can also go with a County, State combination).`}
    </p>
    <p>
    {`Generally, companies opt to have disputes resolved where they are based. Opting for your home city will simplify your life because it will mean you don’t have to travel to resolve a dispute.`}
    </p>
</div>
);

// Enable Fee Shifting Popup
export const feeShifting = (
<div>
    <p>
    {`The default rule in America is that each party pays their own costs (including attorneys’ fees) associated with any dispute. You can change this default rule by including a “fee shifting” clause in your contracts. We provide the ability to include such a clause because some customers have asked us for it.`}
    </p>
    <p>
    {`If you opt to enable fee shifting, we’ll include this clause in your agreements, which will mean that the party that loses in a dispute will have to pay the fees incurred by the winning party.`}
    </p>
    <p>
    {`Enabling fee shifting means a final decision in a dispute will be a bit more all or nothing. Enabling fee shifting can protect you from having to pay to defend yourself against frivolous claims. On the other hand, the chance of getting attorneys’ fees could be what makes it worthwhile for someone to bring a claim against you.`}
    </p>
    <p>
    {`The most common practice in America is to not include a fee shifting clause. If you want to follow the common practice, select no.`}
    </p>
    <p><Link target="_blank" href="https://help.plainlylegal.com/what-is-fee-shifting">What is fee shifting?</Link></p>

</div>
);