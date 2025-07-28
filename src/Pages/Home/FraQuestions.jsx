import React from 'react'

function FraQuestions() {
    return (
       <div className='py-10 mx-30 bg rounded-xl'>
    <div className='my-10 space-y-4 mx-30'>
        <div className="basis-6/12">
            <h2 className="text-4xl font-bold text-gray-100 text-start">Featured Frequently Asked Questions</h2>
            <p className="text-gray-200 text-start mt-2 w-11/12 mb-10">Find answers to common questions about our global property platform.</p>
        </div>
        <div className="collapse collapse-arrow bg-white text border border-base-300">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">How do I list my property for sale on this platform?</div>
            <div className="collapse-content text-sm">To list a property for sale, create an account, log in, and click on "Post a Property" to provide property details, images, and pricing. Our platform will guide you step-by-step.</div>
        </div>
        <div className="collapse collapse-arrow bg-white text border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">Can I sell property in another country through this platform?</div>
            <div className="collapse-content text-sm">Yes, our platform supports property listings from various countries worldwide. You can easily list and sell properties in any country covered by our service.</div>
        </div>
        <div className="collapse collapse-arrow bg-white text border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">How do I make a secure payment when buying property online?</div>
            <div className="collapse-content text-sm">Our platform ensures secure transactions by offering trusted payment gateways such as bank transfers, credit cards, and third-party payment services, ensuring both parties are protected.</div>
        </div>
        <div className="collapse collapse-arrow bg-white text border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">What are the requirements for buying property on this platform?</div>
            <div className="collapse-content text-sm">To purchase property, you need to have a verified account on our platform, meet the local legal requirements for property ownership in your chosen country, and provide necessary documents such as proof of identity and income.</div>
        </div>
        <div className="collapse collapse-arrow bg-white text border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">How do I know if a property is listed by a legitimate seller?</div>
            <div className="collapse-content text-sm">Our platform thoroughly verifies all sellers before their properties are listed. We check their ownership documents, identity, and ensure all legal requirements are met to ensure that the properties are legitimate.</div>
        </div>
        <div className="collapse collapse-arrow bg-white text border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">Can I negotiate the price with the property seller?</div>
            <div className="collapse-content text-sm">Yes, many sellers allow negotiation. You can contact the seller through our platform's messaging system to discuss price, terms, and other conditions before making an offer.</div>
        </div>
        <div className="collapse collapse-arrow bg-white text border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">What should I do if I encounter issues during a property transaction?</div>
            <div className="collapse-content text-sm">If you face any issues, please contact our customer support team immediately. We provide 24/7 assistance for resolving disputes, offering guidance, and ensuring that the transaction is completed successfully and securely.</div>
        </div>
    </div>
</div>


    )
}

export default FraQuestions