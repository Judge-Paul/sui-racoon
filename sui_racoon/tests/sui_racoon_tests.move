#[test_only]
module sui_racoon::sui_racoon_tests {
    use sui::test_scenario;
    use sui::object::{Self};
    use sui_racoon::organizer_pass::{Self, AdminCap, OrganizerPass};
    use sui_racoon::badge::{Self};
    use sui_racoon::student_profile::{Self, StudentProfile};
    use sui::clock::{Self};
    use std::string;

    const ADMIN: address = @0xA;
    const ORGANIZER: address = @0xB;
    const STUDENT: address = @0xC;

    #[test]
    fun test_e2e_flow() {
        let mut scenario = test_scenario::begin(ADMIN);
        
        // 1. Admin initializes organizer pass module
        {
            let ctx = test_scenario::ctx(&mut scenario);
            organizer_pass::init_for_testing(ctx);
        };

        // 2. Admin mints OrganizerPass for ORGANIZER
        test_scenario::next_tx(&mut scenario, ADMIN);
        {
            let admin_cap = test_scenario::take_from_sender<AdminCap>(&scenario);
            let ctx = test_scenario::ctx(&mut scenario);
            let pass = organizer_pass::mint(&admin_cap, ORGANIZER, ctx);
            sui::transfer::transfer(pass, ORGANIZER);
            test_scenario::return_to_sender(&scenario, admin_cap);
        };

        // 3. Organizer issues a Badge to STUDENT (evidence_url points to off-chain proof)
        test_scenario::next_tx(&mut scenario, ORGANIZER);
        {
            let pass = test_scenario::take_from_sender<OrganizerPass>(&scenario);
            let mut clock = clock::create_for_testing(test_scenario::ctx(&mut scenario));
            let ctx = test_scenario::ctx(&mut scenario);

            let badge = badge::issue(
                &pass,
                &clock,
                b"Sui Builder Badge",
                b"Completed Level 1",
                b"Education",
                b"https://example.com/proof",
                ctx
            );
            
            // Transfer badge to student
            sui::transfer::public_transfer(badge, STUDENT);
            
            test_scenario::return_to_sender(&scenario, pass);
            clock::destroy_for_testing(clock);
        };

        // 4. Student creates profile and adds badge
        test_scenario::next_tx(&mut scenario, STUDENT);
        {
            let badge = test_scenario::take_from_sender<badge::Badge>(&scenario);
            let badge_id = object::id(&badge);
            let ctx = test_scenario::ctx(&mut scenario);

            let mut profile = student_profile::create(
                b"Alice",
                b"Sui University",
                b"https://example.com/alice.jpg",
                ctx
            );

            student_profile::add_badge(&mut profile, &badge, ctx);
            
            // Verify badge is added
            assert!(student_profile::has_badge(&profile, badge_id), 0);

            sui::transfer::public_transfer(badge, STUDENT); // return badge to owner (or burn it if we had a burn function)
            sui::transfer::transfer(profile, STUDENT);
        };

        test_scenario::end(scenario);
    }
}
