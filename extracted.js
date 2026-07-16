
  (() => {
    'use strict';

    const STORAGE_KEY = 'pfWorkoutApp.v1';
    const ACTIVE_KEY = 'pfWorkoutApp.active.v1';
    const RECOVERY_KEY = 'pfWorkoutApp.recovery.v1';
    const META_KEY = 'pfWorkoutApp.meta.v1';
    const APP_VERSION = 'nexset-3.4.1';
    const APP_VERSION_LABEL = '3.4.1';
    const DATA_SCHEMA_VERSION = 5;
    const STORAGE_WEIGHT_UNIT = 'lb';
    const LB_PER_KG = 2.2046226218;
    const APP_CACHE_PREFIX = 'nexset-workout-';
    const MAX_IMPORT_BYTES = 8 * 1024 * 1024;

    const PLAN = [
      {
        day: 1,
        type: 'lift',
        title: 'Push A',
        focus: 'Chest, shoulders, triceps',
        warmup: '5 minutes easy cardio + 1–2 warm-up sets before Smith bench.',
        note: 'Push hard but leave 1–2 clean reps in the tank on most sets.',
        exercises: [
          { id: 'smith_bench', name: 'Smith Machine Bench Press', type: 'weighted', sets: 4, min: 8, max: 10, increment: 10, equipment: 'Smith machine', cues: 'Shoulder blades tucked; lower bar under control.' },
          { id: 'incline_db_press', name: 'Incline Dumbbell Press', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Dumbbells', cues: 'Use a moderate incline; avoid bouncing at the bottom.' },
          { id: 'machine_chest_fly', name: 'Machine Chest Fly', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Pec deck', cues: 'Soft elbows; squeeze chest without shrugging.' },
          { id: 'seated_db_shoulder_press', name: 'Seated Dumbbell Shoulder Press', type: 'weighted', sets: 3, min: 8, max: 12, increment: 5, equipment: 'Dumbbells', cues: 'Do not arch your back; press slightly forward at the top.' },
          { id: 'cable_lateral_raise', name: 'Cable Lateral Raise', type: 'weighted', sets: 3, min: 12, max: 15, increment: 2.5, equipment: 'Cable', cues: 'Lead with elbows; pause near shoulder height.' },
          { id: 'rope_tricep_pushdown', name: 'Rope Triceps Pushdown', type: 'weighted', sets: 3, min: 10, max: 15, increment: 5, equipment: 'Cable', cues: 'Keep elbows pinned; split rope at the bottom.' },
          { id: 'overhead_cable_triceps', name: 'Overhead Cable Triceps Extension', type: 'weighted', sets: 2, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Stretch triceps; do not flare ribs.' },
          { id: 'incline_treadmill_push', name: 'Incline Treadmill Walk', type: 'cardio', sets: 1, min: 15, max: 20, increment: 2, unit: 'min', equipment: 'Treadmill', cues: 'Incline 6–10, speed 2.8–3.5 mph.' }
        ]
      },
      {
        day: 2,
        type: 'lift',
        title: 'Pull A',
        focus: 'Back, biceps, core',
        warmup: '5 minutes cardio + light pulldowns and rows before working sets.',
        note: 'Pull elbows toward your pockets on back work. Avoid turning rows into lower-back swings.',
        exercises: [
          { id: 'lat_pulldown', name: 'Lat Pulldown', type: 'weighted', sets: 4, min: 8, max: 12, increment: 5, equipment: 'Cable machine', cues: 'Chest up; pull to upper chest.' },
          { id: 'seated_cable_row', name: 'Seated Cable Row', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Cable row', cues: 'Pause with shoulder blades squeezed.' },
          { id: 'chest_supported_row', name: 'Chest-Supported Row Machine', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Machine row', cues: 'Keep chest glued to pad.' },
          { id: 'cable_face_pull', name: 'Cable Face Pull', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Pull toward eyebrows; elbows high.' },
          { id: 'db_hammer_curl', name: 'Dumbbell Hammer Curl', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Dumbbells', cues: 'No swinging; control the lower.' },
          { id: 'cable_curl', name: 'Cable Curl', type: 'weighted', sets: 2, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Keep shoulders still; squeeze at top.' },
          { id: 'captains_chair_knee_raise', name: 'Captain’s Chair Knee Raise', type: 'bodyweight', sets: 3, min: 12, max: 15, increment: 0, equipment: 'Captain’s chair', cues: 'Curl pelvis up; avoid swinging.' },
          { id: 'stair_or_bike_pull', name: 'Stair Climber or Bike', type: 'cardio', sets: 1, min: 12, max: 15, increment: 2, unit: 'min', equipment: 'Cardio', cues: 'Moderate pace after lifting.' }
        ]
      },
      {
        day: 3,
        type: 'rest',
        title: 'Active Recovery',
        focus: 'Rest day with optional movement',
        warmup: 'No warm-up required.',
        note: 'This is a recovery day. The goal is to feel better when you leave than when you started.',
        exercises: [
          { id: 'easy_walk_recovery', name: 'Easy Walk', type: 'cardio', sets: 1, min: 20, max: 30, increment: 5, unit: 'min', equipment: 'Treadmill/outside', cues: 'Easy pace; you should be able to hold a conversation.' },
          { id: 'mobility_flow', name: 'Mobility Flow', type: 'timed', sets: 1, min: 8, max: 10, increment: 2, unit: 'min', equipment: 'Mat', cues: 'Hips, hamstrings, chest, back.' },
          { id: 'stretch_recovery', name: 'Stretching', type: 'timed', sets: 1, min: 5, max: 10, increment: 2, unit: 'min', equipment: 'Mat', cues: 'Gentle holds only; no forcing.' }
        ]
      },
      {
        day: 4,
        type: 'lift',
        title: 'Legs A',
        focus: 'Quads, glutes, hamstrings, calves',
        warmup: '5 minutes bike + 1–2 light sets on 45° leg press before working sets.',
        note: 'No lunges. Control every rep and use the 45° leg press with a full foot on the platform.',
        exercises: [
          { id: 'smith_squat', name: 'Smith Machine Squat', type: 'weighted', sets: 4, min: 8, max: 10, increment: 10, equipment: 'Smith machine', cues: 'Brace hard, sit straight down, and drive through mid-foot.' },
          { id: 'romanian_deadlift', name: 'Romanian Deadlift', type: 'weighted', sets: 4, min: 8, max: 10, increment: 10, equipment: 'Dumbbells', cues: 'Hips back, soft knees, and feel the stretch in your hamstrings.' },
          { id: 'leg_press_45', name: '45° Leg Press', type: 'weighted', sets: 3, min: 10, max: 15, increment: 10, equipment: 'Leg press', cues: 'Full foot on platform; feet slightly high and do not lock knees hard.' },
          { id: 'leg_extension', name: 'Leg Extension', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Leg extension', cues: 'Pause at the top; slow lower.' },
          { id: 'seated_leg_curl_a', name: 'Seated Leg Curl', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Leg curl', cues: 'Keep hips down; squeeze hamstrings.' },
          { id: 'standing_calf_raise', name: 'Standing Calf Raise', type: 'weighted', sets: 4, min: 12, max: 15, increment: 5, equipment: 'Calf machine', cues: 'Full stretch; pause at top.' },
          { id: 'bike_or_walk_legs_a', name: 'Bike or Incline Walk', type: 'cardio', sets: 1, min: 10, max: 15, increment: 2, unit: 'min', equipment: 'Cardio', cues: 'Easy to moderate pace. Finish refreshed enough to recover for the next session.' }
        ]
      },
      {
        day: 5,
        type: 'lift',
        title: 'Upper Definition',
        focus: 'Chest, back, shoulders, arms',
        warmup: '5 minutes easy cardio + light upper-body warm-up sets.',
        note: 'Shorter rest here. Aim for a strong pump and clean tempo, not max weight.',
        exercises: [
          { id: 'machine_chest_press', name: 'Machine Chest Press', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Chest press', cues: 'Smooth reps; do not bounce.' },
          { id: 'neutral_lat_pulldown', name: 'Neutral-Grip Lat Pulldown', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Cable machine', cues: 'Pull elbows down and in.' },
          { id: 'reverse_pec_deck', name: 'Reverse Pec Deck', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Machine', cues: 'Control rear delts; no shrugging.' },
          { id: 'seated_cable_row_def', name: 'Seated Cable Row', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Cable row', cues: 'Pause and squeeze.' },
          { id: 'machine_shoulder_press', name: 'Machine Shoulder Press', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Machine', cues: 'Stop just short of lockout.' },
          { id: 'db_lateral_raise', name: 'Dumbbell Lateral Raise', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Dumbbells', cues: 'Use lighter weight; strict reps.' },
          { id: 'rope_pushdown_upper', name: 'Rope Pushdown', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Superset with cable curls if the gym is not packed.' },
          { id: 'cable_curl_upper', name: 'Cable Curl', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Superset with rope pushdowns.' },
          { id: 'treadmill_intervals_upper', name: 'Treadmill Intervals', type: 'cardio', sets: 1, min: 10, max: 12, increment: 2, unit: 'min', equipment: 'Treadmill', cues: '1 min hard walk / 1 min easy walk.' }
        ]
      },
      {
        day: 6,
        type: 'lift',
        title: 'Legs B',
        focus: 'Hamstrings, glutes, calves',
        warmup: '5 minutes bike + light RDL pattern before working sets.',
        note: 'No lunges. This day is posterior-chain focused.',
        exercises: [
          { id: 'smith_rdl', name: 'Smith Machine Romanian Deadlift', type: 'weighted', sets: 4, min: 8, max: 10, increment: 10, equipment: 'Smith machine', cues: 'Hips back; feel hamstrings; neutral spine.' },
          { id: 'high_foot_leg_press', name: 'High-Foot Leg Press', type: 'weighted', sets: 3, min: 10, max: 12, increment: 10, equipment: 'Leg press', cues: 'Feet higher to hit glutes/hamstrings.' },
          { id: 'seated_leg_curl_b', name: 'Seated Leg Curl', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Leg curl', cues: 'Slow lower; squeeze hard.' },
          { id: 'cable_glute_kickback', name: 'Cable Glute Kickback', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Log weight per side; keep torso stable.' },
          { id: 'hip_abductor', name: 'Hip Abductor Machine', type: 'weighted', sets: 3, min: 15, max: 20, increment: 5, equipment: 'Machine', cues: 'Pause wide; control return.' },
          { id: 'leg_extension_b', name: 'Leg Extension', type: 'weighted', sets: 2, min: 12, max: 15, increment: 5, equipment: 'Leg extension', cues: 'Extra quad volume without lunges.' },
          { id: 'calf_press_leg_press', name: 'Calf Press on Leg Press', type: 'weighted', sets: 4, min: 12, max: 20, increment: 10, equipment: 'Leg press', cues: 'Full stretch and full squeeze.' },
          { id: 'bike_legs_b', name: 'Bike', type: 'cardio', sets: 1, min: 15, max: 20, increment: 2, unit: 'min', equipment: 'Bike', cues: 'Low impact after hamstrings.' }
        ]
      },
      {
        day: 7,
        type: 'rest',
        title: 'Full Rest',
        focus: 'Recovery, steps, sleep',
        warmup: 'No workout required.',
        note: 'True rest. Optional easy steps only. This is what keeps the routine sustainable.',
        exercises: [
          { id: 'optional_steps_rest', name: 'Optional Easy Steps', type: 'cardio', sets: 1, min: 15, max: 25, increment: 5, unit: 'min', equipment: 'Walk', cues: 'Optional. Keep it easy.' },
          { id: 'light_stretch_rest', name: 'Light Stretching', type: 'timed', sets: 1, min: 5, max: 10, increment: 2, unit: 'min', equipment: 'Mat', cues: 'Optional recovery work only.' }
        ]
      }
    ];

    const EXTRA_EXERCISES = [
      { id:'cable_chest_press', name:'Standing Cable Chest Press', type:'weighted', movement:'horizontal_push', sets:3, min:10, max:15, increment:5, equipment:'Cable station', cues:'Split stance, ribs down, and press without letting the shoulders roll forward.', steps:['Set both handles around mid-chest and take a stable split stance.','Brace your torso and press the handles forward without shrugging.','Pause briefly, then return under control while keeping cable tension.'] },
      { id:'smith_incline_press', name:'Smith Machine Incline Press', type:'weighted', movement:'incline_push', sets:3, min:8, max:12, increment:10, equipment:'Smith machine + incline bench', cues:'Use a low-to-moderate incline and lower the bar toward the upper chest.', steps:['Set a low-to-moderate incline so the bar reaches upper chest.','Retract your shoulder blades and lower the bar smoothly.','Press without bouncing or letting your shoulders glide forward.'] },
      { id:'assisted_dip', name:'Assisted Dip', type:'bodyweight', movement:'horizontal_push', sets:3, min:8, max:12, increment:5, equipment:'Assisted dip machine', cues:'Keep shoulders down and use assistance that allows a smooth, pain-free range.', steps:['Choose enough assistance to keep every rep controlled.','Lower with your chest slightly forward and shoulders away from your ears.','Press through the handles without bouncing out of the bottom.'] },
      { id:'assisted_pullup', name:'Assisted Pull-Up', type:'bodyweight', movement:'vertical_pull', sets:3, min:6, max:10, increment:5, equipment:'Assisted pull-up machine', cues:'Drive elbows toward your ribs and avoid kicking or swinging.', steps:['Select assistance that lets you start from a controlled stretch.','Pull your chest toward the handles by driving elbows down.','Lower slowly to a full comfortable stretch without swinging.'] },
      { id:'close_neutral_pulldown', name:'Close Neutral-Grip Pulldown', type:'weighted', movement:'vertical_pull', sets:3, min:8, max:12, increment:5, equipment:'Cable machine', cues:'Keep your torso quiet and pull the handle toward the upper chest.', steps:['Secure the thigh pad and use a close neutral handle.','Pull elbows toward your pockets while keeping the torso quiet.','Pause near the upper chest and control the stretch overhead.'] },
      { id:'machine_row_alt', name:'Seated Machine Row', type:'weighted', movement:'horizontal_pull', sets:3, min:8, max:12, increment:5, equipment:'Row machine', cues:'Keep your chest supported and finish by squeezing the shoulder blades.', steps:['Adjust the seat so the handles line up around lower chest.','Brace against the pad and pull elbows behind you without shrugging.','Pause at the squeeze and return until the shoulder blades can move naturally.'] },
      { id:'one_arm_cable_row', name:'One-Arm Cable Row', type:'weighted', movement:'horizontal_pull', sets:3, min:10, max:12, increment:5, equipment:'Cable station', cues:'Square your hips and pull the elbow toward the back pocket.', steps:['Set the cable near waist height and take a stable stance.','Keep your torso square while pulling the elbow toward your hip.','Reach forward under control without twisting through the lower back.'] },
      { id:'preacher_curl_machine', name:'Preacher Curl Machine', type:'weighted', movement:'biceps', sets:3, min:10, max:15, increment:5, equipment:'Preacher curl machine', cues:'Keep the upper arms on the pad and avoid locking the elbows aggressively.', steps:['Adjust the seat so your upper arms rest fully on the pad.','Curl without lifting the elbows away from the pad.','Squeeze at the top and lower to a comfortable near-straight arm.'] },
      { id:'incline_db_curl', name:'Incline Dumbbell Curl', type:'weighted', movement:'biceps', sets:3, min:10, max:12, increment:5, equipment:'Dumbbells + incline bench', cues:'Let the arms hang and curl without bringing the elbows forward.', steps:['Set the bench on an incline and let the arms hang naturally.','Curl without moving the upper arms forward.','Squeeze, then lower completely under control.'] },
      { id:'tricep_press_machine', name:'Triceps Press Machine', type:'weighted', movement:'triceps', sets:3, min:10, max:15, increment:5, equipment:'Triceps press machine', cues:'Keep the shoulders down and extend without rocking your torso.', steps:['Adjust the seat so the handles are comfortable at the start.','Pin the shoulders down and extend the elbows smoothly.','Pause near full extension and return without letting the stack slam.'] },
      { id:'rope_overhead_extension', name:'Rope Overhead Triceps Extension', type:'weighted', movement:'triceps', sets:3, min:10, max:15, increment:5, equipment:'Cable station', cues:'Brace the ribs and keep the upper arms pointed forward.', steps:['Face away from the cable with ribs braced down.','Bend the elbows into a comfortable triceps stretch.','Extend fully while upper arms stay pointed forward.'] },
      { id:'goblet_squat', name:'Goblet Squat', type:'weighted', movement:'squat', sets:3, min:10, max:15, increment:5, equipment:'Dumbbell', cues:'Hold the dumbbell close, sit between your hips, and keep the whole foot planted.', steps:['Hold one dumbbell against your chest and set your stance.','Brace, then sit down between your hips while knees track over toes.','Drive through the full foot and stand without losing your torso position.'] },
      { id:'smith_box_squat', name:'Smith Machine Box Squat', type:'weighted', movement:'squat', sets:4, min:8, max:10, increment:10, equipment:'Smith machine + box/bench', cues:'Touch the box lightly without relaxing, then drive through mid-foot.', steps:['Set the box for a controlled depth and place feet slightly forward.','Brace and sit back to a light touch without relaxing on the box.','Drive up through mid-foot while keeping knees tracking over toes.'] },
      { id:'horizontal_leg_press', name:'Horizontal Leg Press', type:'weighted', movement:'leg_press', sets:3, min:10, max:15, increment:10, equipment:'Horizontal leg press', cues:'Keep hips against the pad and drive through the entire foot.', steps:['Adjust the seat so you can reach a comfortable depth without the hips tucking.','Lower slowly with knees tracking in line with the toes.','Press through mid-foot and stop short of hard knee lockout.'] },
      { id:'lying_leg_curl', name:'Lying Leg Curl', type:'weighted', movement:'knee_flexion', sets:3, min:10, max:15, increment:5, equipment:'Lying leg curl', cues:'Keep hips pressed into the pad and curl without lifting your lower back.', steps:['Align your knees with the machine pivot and place the pad above the heels.','Brace the hips into the pad and curl through a comfortable range.','Pause at the squeeze and lower slowly without dropping the stack.'] },
      { id:'hip_thrust_machine', name:'Hip Thrust Machine', type:'weighted', movement:'hip_extension', sets:3, min:8, max:12, increment:10, equipment:'Hip thrust/glute drive machine', cues:'Tuck the ribs and finish with the glutes, not the lower back.', steps:['Set the belt or pad across the hips and plant both feet evenly.','Lower under control while keeping the ribs stacked over the pelvis.','Drive through the heels and squeeze the glutes without overextending.'] },
      { id:'back_extension', name:'45° Back Extension', type:'bodyweight', movement:'hinge', sets:3, min:10, max:15, increment:0, equipment:'Back extension bench', cues:'Hinge at the hips and stop when your body forms a straight line.', steps:['Set the pad below the hip crease and secure your feet.','Hinge forward with a long spine and soft knees.','Drive the hips into the pad and stop at a straight body line.'] },
      { id:'cable_pull_through', name:'Cable Pull-Through', type:'weighted', movement:'hinge', sets:3, min:10, max:15, increment:5, equipment:'Cable station + rope', cues:'Push the hips back and finish by squeezing the glutes.', steps:['Set the cable low, face away, and step forward with the rope between your legs.','Hinge by pushing the hips back while keeping the spine long.','Drive the hips forward and squeeze the glutes without leaning back.'] },
      { id:'machine_calf_raise', name:'Calf Raise Machine', type:'weighted', movement:'calves', sets:4, min:12, max:20, increment:5, equipment:'Calf raise machine', cues:'Use a full stretch and a clear pause at the top.', steps:['Place the balls of the feet securely on the platform.','Lower the heels into a controlled stretch without bouncing.','Press high onto the toes, pause, and lower slowly.'] },
      { id:'ab_crunch_machine', name:'Ab Crunch Machine', type:'weighted', movement:'core', sets:3, min:10, max:15, increment:5, equipment:'Ab crunch machine', cues:'Curl ribs toward pelvis instead of pulling only with the arms.', steps:['Adjust the seat and handles so the machine fits your torso.','Brace, then curl the ribs toward the pelvis through the abs.','Pause briefly and return without letting the weight pull you open.'] },
      { id:'cable_crunch', name:'Kneeling Cable Crunch', type:'weighted', movement:'core', sets:3, min:10, max:15, increment:5, equipment:'Cable station + rope', cues:'Keep the hips mostly fixed and curl through the trunk.', steps:['Kneel far enough from the stack to keep cable tension.','Brace and curl your ribs toward your pelvis instead of pulling with the arms.','Return slowly without overextending your lower back.'] },
      { id:'plank', name:'Front Plank', type:'timed', movement:'core', sets:3, min:30, max:60, increment:5, unit:'sec', equipment:'Mat', cues:'Squeeze glutes, brace the trunk, and keep a straight line.', steps:['Place elbows under shoulders and extend both legs.','Brace as if preparing for a punch and squeeze the glutes.','End the set before your hips sag or your lower back arches.'] },
      { id:'elliptical_cardio', name:'Elliptical', type:'cardio', movement:'cardio', sets:1, min:10, max:20, increment:2, unit:'min', equipment:'Elliptical', cues:'Use a smooth cadence and a repeatable effort.', steps:['Begin with easy resistance for one to two minutes.','Settle into a smooth full-foot stride and relaxed upper body.','Finish with a brief easy cooldown before stepping off.'] },
      { id:'stair_climber_cardio', name:'Stair Climber', type:'cardio', movement:'cardio', sets:1, min:10, max:15, increment:2, unit:'min', equipment:'Stair climber', cues:'Stay tall and use the rails only for balance.', steps:['Start slowly and establish a safe stepping rhythm.','Keep your torso tall and avoid supporting your body weight on the rails.','Reduce the pace before stepping off the machine.'] },
      { id:'rowing_machine_cardio', name:'Rowing Machine', type:'cardio', movement:'cardio', sets:1, min:8, max:15, increment:2, unit:'min', equipment:'Row ergometer', cues:'Drive with the legs first, then finish with the arms.', steps:['Strap the feet in and begin with a light, controlled pace.','Drive through the legs, open the hips, then pull the handle to the lower ribs.','Reverse the sequence smoothly and keep the stroke repeatable.'] },
      { id:'mobility_hips', name:'Hip Mobility Flow', type:'timed', movement:'mobility', sets:1, min:8, max:12, increment:2, unit:'min', equipment:'Mat', cues:'Move slowly through pain-free hip ranges.', steps:['Choose two or three hip movements that feel restricted today.','Use slow breathing and controlled ranges without forcing depth.','Finish when the hips feel freer, not fatigued.'] },
      { id:'mobility_upper', name:'Upper-Body Mobility Flow', type:'timed', movement:'mobility', sets:1, min:8, max:12, increment:2, unit:'min', equipment:'Mat or cable station', cues:'Focus on shoulders, chest, and upper back without loading fatigue.', steps:['Begin with easy shoulder circles and upper-back rotation.','Move through comfortable chest and lat stretches with slow breathing.','Stop before any position creates pinching or numbness.'] }
    ];

    const MOVEMENT_BY_ID = {
      smith_bench:'horizontal_push', incline_db_press:'incline_push', machine_chest_fly:'chest_isolation', seated_db_shoulder_press:'vertical_push', cable_lateral_raise:'lateral_raise', rope_tricep_pushdown:'triceps', overhead_cable_triceps:'triceps', incline_treadmill_push:'cardio',
      lat_pulldown:'vertical_pull', seated_cable_row:'horizontal_pull', chest_supported_row:'horizontal_pull', cable_face_pull:'rear_delts', db_hammer_curl:'biceps', cable_curl:'biceps', captains_chair_knee_raise:'core', stair_or_bike_pull:'cardio',
      easy_walk_recovery:'cardio', mobility_flow:'mobility', stretch_recovery:'mobility',
      smith_squat:'squat', romanian_deadlift:'hinge', leg_press_45:'leg_press', leg_extension:'knee_extension', seated_leg_curl_a:'knee_flexion', standing_calf_raise:'calves', bike_or_walk_legs_a:'cardio',
      machine_chest_press:'horizontal_push', neutral_lat_pulldown:'vertical_pull', reverse_pec_deck:'rear_delts', seated_cable_row_def:'horizontal_pull', machine_shoulder_press:'vertical_push', db_lateral_raise:'lateral_raise', rope_pushdown_upper:'triceps', cable_curl_upper:'biceps', treadmill_intervals_upper:'cardio',
      smith_rdl:'hinge', high_foot_leg_press:'leg_press', seated_leg_curl_b:'knee_flexion', cable_glute_kickback:'hip_extension', hip_abductor:'hip_abduction', leg_extension_b:'knee_extension', calf_press_leg_press:'calves', bike_legs_b:'cardio',
      optional_steps_rest:'cardio', light_stretch_rest:'mobility'
    };

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
    const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    const fmtDate = iso => new Date(iso).toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' });
    const fmtTime = iso => new Date(iso).toLocaleTimeString(undefined, { hour:'numeric', minute:'2-digit' });
    const dateKey = (date = new Date()) => { const d = new Date(date); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
    const cleanNumber = value => { const n=Number(value); if(!Number.isFinite(n)) return ''; const r=Math.round(n*100)/100; return Number.isInteger(r)?String(r):String(r); };
    const deepClone = value => JSON.parse(JSON.stringify(value));

    let startupNotice = '';
    let recoveryWriteAt = 0;
    let pendingUpdateWorker = null;
    let serviceWorkerRegistration = null;
    let updateReloading = false;
    let meta = loadMeta();
    let state = loadState();
    let active = loadActive();
    let currentView = active ? 'workout' : 'home';
    let toastTimer = null;
    let elapsedTimer = null;
    let restTimer = null;
    let restState = null;
    let lastCompletedSession = null;
    let swipeStart = null;
    let progressTab = 'overview';
    let moreSection = 'menu';
    let exerciseSheetOpen = false;
    let toastAction = null;
    let setEditorContext = null;
    let bodyEditorId = null;
    let workoutListOpen = false;
    let replacementContext = null;
    let quickBuilder = null;
    let programEditor = null;

    function defaultState() {
      return {
        version: DATA_SCHEMA_VERSION,
        storageWeightUnit: STORAGE_WEIGHT_UNIT,
        createdAt: new Date().toISOString(),
        settings: {
          currentDayIndex: 0,
          profileName: 'Bobby',
          restSeconds: 90,
          autoRest: true,
          autoNextAfterTarget: false,
          units: 'lb',
          theme: 'dark',
          coachMode: 'fat_loss',
          smithBarWeight: 20,
          deloadEveryWeeks: 8,
          sound: true,
          pfAppUrl: 'shortcuts://run-shortcut?name=Open%20Planet%20Fitness',
          musicAppUrl: 'music://',
          pfFallbackUrl: 'https://apps.apple.com/us/app/planet-fitness/id399857015',
          musicFallbackUrl: 'https://music.apple.com/us/browse',
          progressExerciseId: 'smith_bench'
        },
        goals: { targetWeight: 200, targetBodyFat: 18 },
        exerciseProgress: {},
        history: [],
        bodyMetrics: [],
        dailyCheckins: [],
        programPlan: deepClone(PLAN),
        quickTemplates: [],
        exerciseSetups: {}
      };
    }

    function defaultMeta() {
      return {
        schemaVersion: DATA_SCHEMA_VERSION,
        appVersion: APP_VERSION,
        lastSavedAt: null,
        lastBackupAt: null,
        lastImportAt: null,
        lastRestoreAt: null,
        lastRecoveryAt: null,
        lastError: null
      };
    }

    function isPlainObject(value) { return Boolean(value) && typeof value === 'object' && !Array.isArray(value); }
    function validDateOr(value, fallback = new Date().toISOString()) { const time = new Date(value).getTime(); return Number.isFinite(time) ? new Date(time).toISOString() : fallback; }
    function appendStartupNotice(message) { startupNotice = startupNotice ? `${startupNotice} ${message}` : message; }
    function finiteNumber(value, fallback = null) { const n=Number(value); return Number.isFinite(n) ? n : fallback; }
    function nullableFiniteNumber(value) { return value===null||value===''||typeof value==='undefined' ? null : finiteNumber(value,null); }

    function normalizeExerciseDefinition(raw, fallback = null) {
      const source=isPlainObject(raw)?raw:(isPlainObject(fallback)?fallback:null); if(!source)return null;
      const type=['weighted','bodyweight','cardio','timed'].includes(source.type)?source.type:'weighted';
      const min=Math.max(type==='timed'&&source.unit==='sec'?1:1,finiteNumber(source.min, type==='cardio'||type==='timed'?10:8));
      const max=Math.max(min,finiteNumber(source.max,min));
      return {
        ...source,
        id:String(source.id||fallback?.id||''), name:String(source.name||fallback?.name||'Exercise'), type,
        sets:clamp(Math.trunc(finiteNumber(source.sets,1)),1,12), min, max,
        increment:Math.max(0,finiteNumber(source.increment,type==='weighted'?5:type==='cardio'||type==='timed'?1:0)),
        restSeconds:clamp(Math.trunc(finiteNumber(source.restSeconds, type==='weighted'||type==='bodyweight'?90:0)),0,900),
        unit:String(source.unit||(type==='cardio'||type==='timed'?'min':'')), equipment:String(source.equipment||''), cues:String(source.cues||''),
        movement:String(source.movement||MOVEMENT_BY_ID[source.id]||''), steps:Array.isArray(source.steps)?source.steps.map(String).slice(0,6):undefined
      };
    }
    function normalizeProgramPlan(rawPlan) {
      const source=Array.isArray(rawPlan)&&rawPlan.length?rawPlan:PLAN;
      const days=source.slice(0,14).filter(isPlainObject).map((raw,index)=>{
        const fallback=PLAN[index]||PLAN[index%PLAN.length]||{};
        const exercises=Array.isArray(raw.exercises)?raw.exercises.map(ex=>normalizeExerciseDefinition(ex,getExerciseFromStatic(ex?.id))).filter(ex=>ex?.id):[];
        return {...raw,day:index+1,type:raw.type==='rest'?'rest':'lift',title:String(raw.title||fallback.title||`Day ${index+1}`),focus:String(raw.focus||fallback.focus||''),warmup:String(raw.warmup||fallback.warmup||''),note:String(raw.note||fallback.note||''),exercises:exercises.length?exercises:deepClone(fallback.exercises||[]).map(ex=>normalizeExerciseDefinition(ex,ex))};
      });
      return days.length?days:deepClone(PLAN);
    }
    function getExerciseFromStatic(id) {
      const key=String(id||'');
      for(const day of PLAN){const ex=day.exercises.find(item=>item.id===key);if(ex)return ex;}
      return EXTRA_EXERCISES.find(item=>item.id===key)||null;
    }
    function getPlan() { return Array.isArray(state?.programPlan)&&state.programPlan.length?state.programPlan:PLAN; }
    function entryExercise(entry) { return normalizeExerciseDefinition(entry?.exercise,getExercise(entry?.id)); }
    function movementGroup(ex) {
      if(!ex)return 'other'; if(ex.movement)return ex.movement; if(MOVEMENT_BY_ID[ex.id])return MOVEMENT_BY_ID[ex.id];
      const text=`${ex.id||''} ${ex.name||''} ${ex.equipment||''}`.toLowerCase();
      if(ex.type==='cardio')return 'cardio'; if(ex.type==='timed')return text.includes('plank')?'core':'mobility';
      if(/pulldown|pull-up|pullup/.test(text))return 'vertical_pull'; if(/row/.test(text))return 'horizontal_pull'; if(/bench|chest press|dip/.test(text))return 'horizontal_push'; if(/shoulder press/.test(text))return 'vertical_push';
      if(/lateral raise/.test(text))return 'lateral_raise'; if(/curl/.test(text)&&!/leg curl/.test(text))return 'biceps'; if(/tricep|pushdown|extension/.test(text)&&!/leg extension/.test(text))return 'triceps';
      if(/squat/.test(text))return 'squat'; if(/leg press/.test(text))return 'leg_press'; if(/leg extension/.test(text))return 'knee_extension'; if(/leg curl/.test(text))return 'knee_flexion'; if(/deadlift|pull-through|back extension/.test(text))return 'hinge'; if(/glute|hip thrust|kickback/.test(text))return 'hip_extension'; if(/abductor/.test(text))return 'hip_abduction'; if(/calf/.test(text))return 'calves'; if(/knee raise|crunch|plank|core/.test(text))return 'core';
      return ex.type||'other';
    }
    function exerciseLibrary() {
      const map=new Map();
      for(const day of getPlan())for(const ex of day.exercises)map.set(ex.id,normalizeExerciseDefinition(ex,ex));
      for(const ex of EXTRA_EXERCISES)map.set(ex.id,normalizeExerciseDefinition(ex,ex));
      for(const day of getPlan())for(const ex of day.exercises||[])map.set(ex.id,normalizeExerciseDefinition(ex,getExerciseFromStatic(ex.id)));
      return [...map.values()].filter(ex=>ex?.id).sort((a,b)=>a.name.localeCompare(b.name));
    }
    function replacementCandidates(ex) {
      const group=movementGroup(ex),same=exerciseLibrary().filter(item=>item.id!==ex.id&&movementGroup(item)===group);
      if(same.length)return same;
      return exerciseLibrary().filter(item=>item.id!==ex.id&&item.type===ex.type).slice(0,12);
    }
    function makeActiveEntry(ex, planExerciseIndex = null) {
      const normalized=normalizeExerciseDefinition(ex,ex);
      return {id:normalized.id,exercise:deepClone(normalized),planExerciseIndex:Number.isInteger(planExerciseIndex)?planExerciseIndex:null,status:'open',logs:[],notes:'',draftWeight:initialWeight(normalized),draftReps:initialReps(normalized),draftFeel:'good',draftWarmup:false};
    }
    function activeEntryStatus(entry) {
      if(entry?.status==='skipped')return 'skipped'; const ex=entryExercise(entry); if(!ex)return 'open';
      return workingLogs(entry.logs||[]).length>=Math.max(1,Number(ex.sets)||1)?'done':'open';
    }
    function nextOpenExerciseIndex(fromIndex = active?.currentExerciseIndex ?? 0, direction = 1) {
      if(!active?.exercises?.length)return -1; const total=active.exercises.length;
      for(let step=1;step<=total;step++){const i=(fromIndex+step*direction+total)%total;const entry=active.exercises[i];if(entry.status!=='skipped'&&activeEntryStatus(entry)!=='done')return i;}
      for(let step=1;step<=total;step++){const i=(fromIndex+step*direction+total)%total;if(active.exercises[i].status!=='skipped')return i;}
      return fromIndex;
    }
    function savedSetupFor(id){return String(state.exerciseSetups?.[id]||'');}

    function displayWeightUnit() { return state?.settings?.units === 'kg' ? 'kg' : 'lb'; }
    function toStorageWeight(value, unit = displayWeightUnit()) { const n=Number(value); if(!Number.isFinite(n)) return null; return unit==='kg' ? n*LB_PER_KG : n; }
    function fromStorageWeight(value, unit = displayWeightUnit()) { const n=Number(value); if(!Number.isFinite(n)) return null; return unit==='kg' ? n/LB_PER_KG : n; }
    function roundedDisplayWeight(value) { const shown=fromStorageWeight(value); if(!Number.isFinite(shown)) return null; return Math.round(shown*100)/100; }
    function formatWeightValue(value, includeUnit=true) { const shown=roundedDisplayWeight(value); return Number.isFinite(shown) ? `${cleanNumber(shown)}${includeUnit?` ${displayWeightUnit()}`:''}` : '—'; }
    function displayVolumeValue(value) { const n=Number(value)||0; return displayWeightUnit()==='kg' ? n/LB_PER_KG : n; }
    function formatVolumeValue(value) { return Math.round(displayVolumeValue(value)).toLocaleString(); }
    function displayIncrement(ex) { if(displayWeightUnit()==='lb') return Math.max(.5,Number(ex?.increment)||5); const base=Number(ex?.increment)||5; return base>=10?5:base<=2.5?1:2.5; }
    function roundStorageToDisplayIncrement(value, ex) { const step=displayIncrement(ex),shown=fromStorageWeight(value); return toStorageWeight(roundTo(shown,step)); }
    function migrateWeightValue(value, factor) { const n=Number(value); return Number.isFinite(n) ? n*factor : value; }
    function migrateStateToCanonicalWeights(incoming) {
      const source=deepClone(incoming), schema=Number(source.version||source.schemaVersion||0), declared=source.storageWeightUnit;
      const legacyUnit=source.settings?.units==='kg'?'kg':'lb';
      const declaredKg=declared==='kg';
      const legacyExerciseKg=!declared && schema<DATA_SCHEMA_VERSION && legacyUnit==='kg';
      if(declaredKg || legacyExerciseKg){
        const convert=value=>migrateWeightValue(value,LB_PER_KG);
        for(const session of source.history||[]){
          for(const entry of session.exercises||[]) for(const log of entry.logs||[]) if(log&&log.weight!==null&&log.weight!=='') log.weight=convert(log.weight);
          for(const pr of session.prs||[]) if(Number.isFinite(Number(pr?.score))) pr.score=convert(pr.score);
        }
        for(const progress of Object.values(source.exerciseProgress||{})){ if(progress.lastWeight!==null&&progress.lastWeight!=='') progress.lastWeight=convert(progress.lastWeight); if(progress.nextWeight!==null&&progress.nextWeight!=='') progress.nextWeight=convert(progress.nextWeight); }
        if(declaredKg){
          for(const metric of source.bodyMetrics||[]){ if(metric.weight!==null&&metric.weight!=='') metric.weight=convert(metric.weight); if(metric.muscleMass!==null&&metric.muscleMass!=='') metric.muscleMass=convert(metric.muscleMass); }
          if(source.goals?.targetWeight!==null&&source.goals?.targetWeight!=='') source.goals.targetWeight=convert(source.goals.targetWeight);
          if(source.settings?.smithBarWeight!==null&&source.settings?.smithBarWeight!=='') source.settings.smithBarWeight=convert(source.settings.smithBarWeight);
        }
        appendStartupNotice(legacyExerciseKg?'Legacy workout weights were migrated to reliable lb/kg storage.':'Weights were migrated to reliable lb/kg storage.');
      }
      source.version=DATA_SCHEMA_VERSION; source.storageWeightUnit=STORAGE_WEIGHT_UNIT;
      return source;
    }
    function migrateActiveToCanonicalWeights(session, legacyDisplayUnit='lb') {
      const source=deepClone(session), schema=Number(source.schemaVersion||source.version||0), declared=source.storageWeightUnit;
      const shouldConvert=declared==='kg' || (!declared && schema<DATA_SCHEMA_VERSION && legacyDisplayUnit==='kg');
      if(shouldConvert) for(const entry of source.exercises||[]){
        if(entry.draftWeight!==null&&entry.draftWeight!=='') entry.draftWeight=migrateWeightValue(entry.draftWeight,LB_PER_KG);
        for(const log of entry.logs||[]) if(log&&log.weight!==null&&log.weight!=='') log.weight=migrateWeightValue(log.weight,LB_PER_KG);
      }
      source.schemaVersion=DATA_SCHEMA_VERSION; source.storageWeightUnit=STORAGE_WEIGHT_UNIT;
      return source;
    }

    function loadMeta() {
      try {
        const parsed = JSON.parse(localStorage.getItem(META_KEY) || '{}');
        return { ...defaultMeta(), ...(isPlainObject(parsed) ? parsed : {}), schemaVersion: DATA_SCHEMA_VERSION, appVersion: APP_VERSION };
      } catch (_) { return defaultMeta(); }
    }

    function persistMeta(patch = {}) {
      meta = { ...defaultMeta(), ...(meta || {}), ...patch, schemaVersion: DATA_SCHEMA_VERSION, appVersion: APP_VERSION };
      try { localStorage.setItem(META_KEY, JSON.stringify(meta)); return true; }
      catch (error) { console.warn('Metadata save unavailable', error); return false; }
    }

    function normalizeHistory(items) {
      if(!Array.isArray(items)) return [];
      return items.filter(isPlainObject).slice(-10000).map((rawSession, index) => {
        const startedAt=validDateOr(rawSession.startedAt);
        return {
          ...rawSession,
          id: String(rawSession.id || `session-${index}-${Date.now()}`),
          schemaVersion: DATA_SCHEMA_VERSION,
          storageWeightUnit: STORAGE_WEIGHT_UNIT,
          startedAt,
          endedAt: rawSession.endedAt ? validDateOr(rawSession.endedAt,startedAt) : rawSession.endedAt,
          completedAt: rawSession.completedAt ? validDateOr(rawSession.completedAt,startedAt) : rawSession.completedAt,
          durationMs: Math.max(0, Number(rawSession.durationMs) || 0),
          sessionNote: String(rawSession.sessionNote || ''),
          exercises: Array.isArray(rawSession.exercises) ? rawSession.exercises.filter(isPlainObject).map(entry => ({
            ...entry,
            id: String(entry.id || ''),
            exercise: normalizeExerciseDefinition(entry.exercise,getExerciseFromStatic(entry.id)),
            planExerciseIndex: Number.isInteger(entry.planExerciseIndex)?entry.planExerciseIndex:null,
            status: entry.status==='skipped'?'skipped':'open',
            replacedFrom: entry.replacedFrom?String(entry.replacedFrom):'',
            notes: String(entry.notes || ''),
            logs: Array.isArray(entry.logs) ? entry.logs.filter(isPlainObject).map(log=>({
              ...log,
              weight: log.weight===null||log.weight===''?null:finiteNumber(log.weight,null),
              reps: log.reps===null||log.reps===''?null:finiteNumber(log.reps,null),
              duration: log.duration===null||log.duration===''?null:finiteNumber(log.duration,null),
              feel: ['easy','good','hard'].includes(log.feel)?log.feel:'good',
              warmup: Boolean(log.warmup),
              at: validDateOr(log.at||startedAt,startedAt)
            })) : []
          })).filter(entry => entry.id) : [],
          prs: Array.isArray(rawSession.prs) ? rawSession.prs.filter(isPlainObject) : []
        };
      });
    }

    function normalizeState(incoming) {
      if(!isPlainObject(incoming)) throw new Error('Invalid state object');
      const source=migrateStateToCanonicalWeights(incoming), base=defaultState();
      const merged = { ...base, ...source };
      merged.version = DATA_SCHEMA_VERSION;
      merged.storageWeightUnit = STORAGE_WEIGHT_UNIT;
      merged.createdAt = validDateOr(source.createdAt, base.createdAt);
      merged.settings = { ...base.settings, ...(isPlainObject(source.settings) ? source.settings : {}) };
      merged.goals = { ...base.goals, ...(isPlainObject(source.goals) ? source.goals : {}) };
      merged.history = normalizeHistory(source.history);
      merged.bodyMetrics = Array.isArray(source.bodyMetrics) ? source.bodyMetrics.filter(isPlainObject).slice(-5000).map((metric,index)=>({
        ...metric,
        id:String(metric.id||`body-${index}-${Date.now()}`),
        date:validDateOr(metric.date),
        weight:nullableFiniteNumber(metric.weight),
        muscleMass:nullableFiniteNumber(metric.muscleMass),
        bodyFat:nullableFiniteNumber(metric.bodyFat),
        waist:nullableFiniteNumber(metric.waist),
        skeletalMuscle:nullableFiniteNumber(metric.skeletalMuscle),
        visceralFat:nullableFiniteNumber(metric.visceralFat),
        note:String(metric.note||'')
      })).filter(metric=>Number.isFinite(metric.weight)) : [];
      merged.dailyCheckins = Array.isArray(source.dailyCheckins) ? source.dailyCheckins.filter(isPlainObject).slice(-5000) : [];
      merged.exerciseProgress = isPlainObject(source.exerciseProgress) ? source.exerciseProgress : {};
      merged.programPlan = normalizeProgramPlan(source.programPlan);
      merged.quickTemplates = Array.isArray(source.quickTemplates) ? source.quickTemplates.filter(isPlainObject).slice(-50).map((template,index)=>({id:String(template.id||`template-${index}-${Date.now()}`),name:String(template.name||'Workout template'),exerciseIds:Array.isArray(template.exerciseIds)?template.exerciseIds.map(String).filter(id=>Boolean(getExerciseFromStatic(id))).slice(0,30):[],createdAt:validDateOr(template.createdAt)})).filter(template=>template.exerciseIds.length) : [];
      merged.exerciseSetups = isPlainObject(source.exerciseSetups) ? Object.fromEntries(Object.entries(source.exerciseSetups).map(([id,value])=>[String(id),String(value||'').slice(0,1000)]).filter(([,value])=>value)) : {};
      merged.settings.currentDayIndex = clamp(Math.trunc(Number(merged.settings.currentDayIndex) || 0), 0, merged.programPlan.length - 1);
      merged.settings.restSeconds = clamp(Math.trunc(Number(merged.settings.restSeconds) || 90), 5, 900);
      merged.settings.smithBarWeight = Math.max(0, Number(merged.settings.smithBarWeight) || 0);
      merged.settings.theme = ['dark','light'].includes(merged.settings.theme) ? merged.settings.theme : 'dark';
      merged.settings.units = ['lb','kg'].includes(merged.settings.units) ? merged.settings.units : 'lb';
      merged.goals.targetWeight = Math.max(0,Number(merged.goals.targetWeight)||0);
      return merged;
    }

    function normalizeActiveSession(session, legacyDisplayUnit = state?.settings?.units || 'lb') {
      if(!isPlainObject(session) || !Array.isArray(session.exercises) || !session.exercises.length) return null;
      const source=migrateActiveToCanonicalWeights(session,legacyDisplayUnit),plan=getPlan(),isQuick=Boolean(source.isQuick)||Number(source.dayIndex)<0;
      const dayIndex = isQuick ? -1 : clamp(Math.trunc(Number(source.dayIndex) || 0), 0, plan.length - 1);
      const exercises = source.exercises.filter(isPlainObject).map((entry,index) => {
        const exercise=normalizeExerciseDefinition(entry.exercise,getExercise(entry.id)); if(!exercise)return null;
        return {
          id:exercise.id, exercise, planExerciseIndex:Number.isInteger(entry.planExerciseIndex)?entry.planExerciseIndex:index,
          status:entry.status==='skipped'?'skipped':'open',replacedFrom:entry.replacedFrom?String(entry.replacedFrom):'',
          logs: Array.isArray(entry.logs) ? entry.logs.filter(isPlainObject).map(log=>({
            ...log, weight:log.weight===null||log.weight===''?null:finiteNumber(log.weight,null), reps:log.reps===null||log.reps===''?null:finiteNumber(log.reps,null), duration:log.duration===null||log.duration===''?null:finiteNumber(log.duration,null),
            feel:['easy','good','hard'].includes(log.feel)?log.feel:'good', warmup:Boolean(log.warmup), at:validDateOr(log.at||source.startedAt)
          })) : [],
          notes:String(entry.notes||''), draftWeight:entry.draftWeight===null||entry.draftWeight===''?null:finiteNumber(entry.draftWeight,null), draftReps:entry.draftReps===null||entry.draftReps===''?null:finiteNumber(entry.draftReps,null),
          draftFeel:['easy','good','hard'].includes(entry.draftFeel)?entry.draftFeel:'good', draftWarmup:Boolean(entry.draftWarmup)
        };
      }).filter(Boolean);
      if(!exercises.length)return null;
      const timer=isPlainObject(source.restTimer)&&Number.isFinite(Number(source.restTimer.end))&&Number(source.restTimer.end)>Date.now()-3600000?{start:Number(source.restTimer.start)||Date.now(),end:Number(source.restTimer.end),duration:Math.max(5,Number(source.restTimer.duration)||90),exerciseId:String(source.restTimer.exerciseId||''),setIndex:Math.max(0,Number(source.restTimer.setIndex)||0)}:null;
      const fallbackDay=isQuick?null:plan[dayIndex];
      return {...source,id:String(source.id||`active-${Date.now()}`),schemaVersion:DATA_SCHEMA_VERSION,storageWeightUnit:STORAGE_WEIGHT_UNIT,isQuick,dayIndex,day:isQuick?0:(Number(source.day)||fallbackDay?.day||dayIndex+1),title:String(source.title||fallbackDay?.title||(isQuick?'Quick Workout':'Workout')),type:String(source.type||fallbackDay?.type||'lift'),focus:String(source.focus||fallbackDay?.focus||(isQuick?'Custom session':'')),startedAt:validDateOr(source.startedAt),sessionNote:String(source.sessionNote||''),restTimer:timer,currentExerciseIndex:clamp(Math.trunc(Number(source.currentExerciseIndex)||0),0,exercises.length-1),exercises};
    }

    function readRecoverySnapshot() {
      try {
        const parsed = JSON.parse(localStorage.getItem(RECOVERY_KEY) || 'null');
        return isPlainObject(parsed) ? parsed : null;
      } catch (_) { return null; }
    }

    function writeRecoverySnapshot(reason = 'autosave', force = false) {
      const now = Date.now();
      if(!force && now - recoveryWriteAt < 3500) return false;
      recoveryWriteAt = now;
      try {
        const savedAt = new Date(now).toISOString();
        localStorage.setItem(RECOVERY_KEY, JSON.stringify({
          format: 'nexset-recovery', schemaVersion: DATA_SCHEMA_VERSION, appVersion: APP_VERSION,
          savedAt, reason, state, active
        }));
        persistMeta({ lastRecoveryAt: savedAt });
        return true;
      } catch (error) { console.warn('Recovery snapshot unavailable', error); return false; }
    }

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? normalizeState(JSON.parse(raw)) : defaultState();
      } catch (error) {
        console.warn('State load failed', error);
        try {
          const recovery = readRecoverySnapshot();
          if(recovery?.state) {
            appendStartupNotice('Your training data was restored from the local recovery copy.');
            persistMeta({ lastRestoreAt: new Date().toISOString() });
            return normalizeState(recovery.state);
          }
        } catch (recoveryError) { console.warn('Recovery load failed', recoveryError); }
        appendStartupNotice('NEXSET could not read the saved data and opened a clean local profile.');
        return defaultState();
      }
    }

    function loadActive() {
      try {
        const raw = localStorage.getItem(ACTIVE_KEY);
        if(raw) return normalizeActiveSession(JSON.parse(raw),state.settings.units);
      } catch (error) { console.warn('Active session load failed', error); }
      try {
        const recovered = normalizeActiveSession(readRecoverySnapshot()?.active,state.settings.units);
        if(recovered) appendStartupNotice('Your unfinished workout was recovered.');
        return recovered;
      } catch (_) { return null; }
    }

    function saveState(options = {}) {
      try {
        state = normalizeState(state);
        const savedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        persistMeta({ lastSavedAt: savedAt });
        if(options.snapshot !== false) writeRecoverySnapshot(options.reason || 'state-save');
      } catch (error) {
        console.warn('State save unavailable', error);
        persistMeta({ lastError: { at:new Date().toISOString(), source:'state-save', message:String(error?.message || error) } });
      }
      updateChrome();
    }

    function saveActive(options = {}) {
      try {
        const normalized = active ? normalizeActiveSession(active,state.settings.units) : null;
        active=normalized;
        if(normalized) localStorage.setItem(ACTIVE_KEY, JSON.stringify(normalized));
        else localStorage.removeItem(ACTIVE_KEY);
        const savedAt = new Date().toISOString();
        persistMeta({ lastSavedAt: savedAt });
        if(options.snapshot !== false) writeRecoverySnapshot(options.reason || 'active-save', Boolean(options.forceSnapshot || !active));
      } catch (error) {
        console.warn('Active session save unavailable', error);
        persistMeta({ lastError: { at:new Date().toISOString(), source:'active-save', message:String(error?.message || error) } });
      }
    }

    function getDay(index = state.settings.currentDayIndex) { const plan=getPlan(); return plan[((Number(index)||0)+plan.length)%plan.length]; }

    function getExercise(id) { const key=String(id||''); for(const day of getPlan()){const ex=(day.exercises||[]).find(item=>item.id===key);if(ex)return normalizeExerciseDefinition(ex,getExerciseFromStatic(key));} return normalizeExerciseDefinition(getExerciseFromStatic(key),getExerciseFromStatic(key)); }

    function targetLabel(ex) { const range=`${ex.min}–${ex.max} ${ex.unit||'min'}`; return (ex.type==='cardio'||ex.type==='timed') ? (Number(ex.sets)>1?`${ex.sets} × ${range}`:range) : `${ex.sets} × ${ex.min}–${ex.max}`; }

    function feelEmoji(feel) { return feel==='easy'?'🟢':feel==='hard'?'🔴':'🟡'; }
    function workingLogs(logs=[]) { return logs.filter(log => !log.warmup); }
    function latestBodyMetric() { return [...state.bodyMetrics].sort((a,b)=>new Date(a.date)-new Date(b.date)).at(-1) || null; }
    function roundTo(value, increment=5) { return Math.round(Number(value)/increment)*increment; }
    function formatDuration(ms) { const total=Math.max(0,Math.floor(Number(ms||0)/1000)); const h=Math.floor(total/3600),m=Math.floor((total%3600)/60),s=total%60; return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${m}:${String(s).padStart(2,'0')}`; }
    function estimatedMinutes(day) {
      if(day.type==='rest') return Math.max(10,Math.round((day.exercises||[]).reduce((sum,ex)=>sum+(ex.type==='cardio'||ex.type==='timed'?Number(ex.min)||0:0),0)));
      const working=(day.exercises||[]).reduce((sum,ex)=>sum+(ex.type==='weighted'||ex.type==='bodyweight'?Number(ex.sets)||0:0),0);
      const cardio=(day.exercises||[]).filter(ex=>ex.type==='cardio'||ex.type==='timed').reduce((sum,ex)=>sum+Number(ex.min||0),0);
      const rest=(day.exercises||[]).reduce((sum,ex)=>sum+Math.max(0,(Number(ex.sets)||1)-1)*(Number(ex.restSeconds)||state.settings.restSeconds||90),0)/60;
      return Math.round(7+working*1.15+cardio+rest);
    }

    function dayMark(day) {
      if(day?.type==='rest') return `<svg viewBox="0 0 64 64" role="img" aria-label="Recovery"><defs><linearGradient id="recoveryGlow" x1="8" y1="52" x2="54" y2="10" gradientUnits="userSpaceOnUse"><stop stop-color="#38BDF8"/><stop offset="1" stop-color="#087CFF"/></linearGradient></defs><path d="M17 35c0-10.5 7.8-19.2 18-20.6-4.2 3.7-6.8 9.1-6.8 15.1 0 10.9 8.8 19.7 19.7 19.7 2 0 4-.3 5.8-.9A23 23 0 0 1 17 35Z" fill="url(#recoveryGlow)"/><path d="M43.5 12.5l1.8 4.2 4.2 1.8-4.2 1.8-1.8 4.2-1.8-4.2-4.2-1.8 4.2-1.8 1.8-4.2Z" fill="#E0E7FF"/><path d="M17 18l1.2 2.8L21 22l-2.8 1.2L17 26l-1.2-2.8L13 22l2.8-1.2L17 18Z" fill="#BAE6FD"/></svg>`;
      return `<img src="nexset-mark.svg" alt="" />`;
    }
    function haptic(kind='light') {
      try {
        if(!navigator.vibrate) return;
        const pattern=kind==='success'?[35,45,70]:kind==='medium'?[28]:[12];
        navigator.vibrate(pattern);
      } catch(_) {}
    }
    function animateView() {
      const view=$('#view'); if(!view) return;
      view.classList.remove('view-enter');
      if((active && currentView==='workout') || currentView==='complete') return;
      void view.offsetWidth; view.classList.add('view-enter');
    }
    function greeting() { const h=new Date().getHours(); return h<12?'Good morning':h<17?'Good afternoon':'Good evening'; }
    function showToast(message, action=null) {
      const box=$('#toast'); if(!box) return;
      toastAction=action&&typeof action.run==='function'?action:null;
      box.innerHTML=`<span>${esc(message)}</span>${toastAction?`<button class="toast-action" data-action="undo-toast">${esc(toastAction.label||'Undo')}</button>`:''}`;
      box.classList.toggle('has-action',Boolean(toastAction)); box.classList.add('show');
      clearTimeout(toastTimer); toastTimer=setTimeout(()=>{box.classList.remove('show');toastAction=null;},toastAction?5200:2800);
    }

    function headerActionMarkup(mode) {
      if(mode==='calendar') return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="2.4"/><path d="M8 3.5v4M16 3.5v4M4 10h16M8 13h2M12 13h2M16 13h1M8 16h2M12 16h2"/></svg>';
      if(mode==='history') return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.2"/><path d="M12 7.2v5.1l3.5 2M5.5 5.7 3.8 8.8l3.4.2"/></svg>';
      if(mode==='profile') return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.1"/><path d="M5.8 20c.7-4 2.7-6 6.2-6s5.5 2 6.2 6"/></svg>';
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6.2" height="6.2" rx="1.7"/><rect x="13.8" y="4" width="6.2" height="6.2" rx="1.7"/><rect x="4" y="13.8" width="6.2" height="6.2" rx="1.7"/><rect x="13.8" y="13.8" width="6.2" height="6.2" rx="1.7"/></svg>';
    }
    function syncHeaderAction() {
      const btn=$('.header-alert'); if(!btn) return;
      const historyOpen=currentView==='more'&&moreSection==='history';
      const mode=currentView==='plan'?'calendar':historyOpen?'history':(currentView==='more'||currentView==='progress')?'profile':'bell';
      btn.dataset.iconMode=mode;
      btn.innerHTML=headerActionMarkup(mode);
      btn.setAttribute('aria-label',mode==='calendar'?'Program calendar':mode==='history'?'Workout history':mode==='profile'?'Profile actions':'Open quick actions');
    }

    function updateChrome() {
      document.documentElement.dataset.theme=state.settings.theme||'dark';
      const day=getDay(),sub=$('#headerSub');if(sub)sub.textContent=active?`${active.title} in progress`:'Progress Starts With Your Next Set.';
      const focus=Boolean(active&&currentView==='workout'),historyOpen=currentView==='more'&&moreSection==='history',activeNav=currentView==='home'?'home':(currentView==='plan'||currentView==='workout')?'workouts':historyOpen?'history':(currentView==='more'||currentView==='progress')?'profile':'';
      document.body.classList.toggle('focus-running',focus);document.body.dataset.screen=currentView;document.body.dataset.section=currentView==='more'?moreSection:'';
      $('#appHeader')?.classList.toggle('hidden',focus||currentView==='complete');$('#bottomNav')?.classList.toggle('hidden',focus||currentView==='complete');$$('.nav-btn').forEach(btn=>btn.classList.toggle('active',(btn.dataset.nav||btn.dataset.view)===activeNav));syncHeaderAction();
    }

    function render() {
      updateChrome();
      if(currentView==='home') renderHome();
      else if(currentView==='workout') active ? renderFocusWorkout() : renderWorkoutPreview();
      else if(currentView==='progress') renderProgress();
      else if(currentView==='plan') renderPlan();
      else if(currentView==='more') renderMore();
      else if(currentView==='complete') renderCompletion();
      animateView();
      window.scrollTo({top:0,behavior:'instant'});
    }

    function stats() {
      const liftSessions=state.history.filter(s=>s.type!=='rest');
      const recoverySessions=state.history.filter(s=>s.type==='rest');
      const totalSets=liftSessions.reduce((sum,s)=>sum+(s.exercises||[]).reduce((a,e)=>a+workingLogs(e.logs||[]).length,0),0);
      const totalVolume=liftSessions.reduce((sum,s)=>sum+sessionVolume(s),0);
      const cutoff=new Date();cutoff.setDate(cutoff.getDate()-6);cutoff.setHours(0,0,0,0);
      const weekSessions=state.history.filter(s=>new Date(s.startedAt)>=cutoff);
      const strengthThisWeek=weekSessions.filter(s=>s.type!=='rest').length;
      const recoveryThisWeek=weekSessions.filter(s=>s.type==='rest').length;
      return {
        liftSessions:liftSessions.length,strengthSessions:liftSessions.length,restDays:recoverySessions.length,recoverySessions:recoverySessions.length,
        totalSets,totalVolume,thisWeek:weekSessions.length,programDaysThisWeek:weekSessions.length,strengthThisWeek,recoveryThisWeek,
        trainingStreak:calculateStreak('strength'),consistencyStreak:calculateStreak('consistency'),streak:calculateStreak('consistency')
      };
    }

    function calculateStreak(kind='consistency') {
      const sessions=kind==='strength'?state.history.filter(s=>s.type!=='rest'):state.history;
      const dates=new Set(sessions.map(s=>dateKey(s.startedAt)));
      let cursor=new Date(),count=0;
      if(!dates.has(dateKey(cursor))) cursor.setDate(cursor.getDate()-1);
      while(dates.has(dateKey(cursor))){count++;cursor.setDate(cursor.getDate()-1);}
      return count;
    }

    function sessionVolume(session) {
      let total=0; for(const entry of session.exercises||[]){const ex=entryExercise(entry);if(!ex||ex.type!=='weighted')continue;for(const log of workingLogs(entry.logs||[])){const w=Number(log.weight),r=Number(log.reps);if(Number.isFinite(w)&&Number.isFinite(r))total+=w*r;}}
      return Math.round(total);
    }

    function sessionWorkingSets(session) { return (session.exercises||[]).reduce((sum,e)=>sum+workingLogs(e.logs||[]).length,0); }
    function sessionCardioMinutes(session) { let total=0; for(const e of session.exercises||[]){const ex=entryExercise(e);if(ex&&(ex.type==='cardio'||ex.type==='timed'))for(const log of e.logs||[])total+=Number(log.duration)||0;}return Math.round(total*100)/100; }

    function figureModeForDay(day) {
      const title=String(day?.title||'').toLowerCase();
      const focus=String(day?.focus||'').toLowerCase();
      const text=`${title} ${focus}`;
      const hasAny=(...words)=>words.some(word=>text.includes(word));
      if(hasAny('recover','rest','cardio','mobility','walk','deload')) return 'recovery';
      if(title.includes('legs b') || (hasAny('hamstring','glute','posterior') && !focus.includes('quad'))) return 'legs-b';
      if(hasAny('leg','quad','hamstring','glute','calf','lower body')) return 'legs-a';
      if(hasAny('upper','definition') && hasAny('chest','back','shoulder','arm','bicep','tricep')) return 'upper';
      if(hasAny('pull','back','lat','rear delt','bicep','row')) return 'pull';
      if(hasAny('push','chest','shoulder','tricep','press')) return 'push';
      return 'push';
    }

    function resolveSessionDay(session) {
      const plan=getPlan(); if(Number.isInteger(session?.dayIndex)&&session.dayIndex>=0&&plan[session.dayIndex])return plan[session.dayIndex];
      const title=String(session?.title||'').toLowerCase(); return plan.find(day=>String(day.title||'').toLowerCase()===title)||PLAN.find(day=>String(day.title||'').toLowerCase()===title)||{title:session?.title||'Workout',focus:session?.focus||''};
    }

    function renderMuscleFigure(day, compact=false) {
      const mode=figureModeForDay(day);
      const labels={push:'Chest, shoulders & triceps',pull:'Back & biceps','legs-a':'Quads, glutes & calves','legs-b':'Hamstrings, glutes & calves',upper:'Upper-body focus',recovery:'Recovery & mobility'};
      const src=`muscle-${mode}-v341.png`;
      return `<span class="anatomy-figure ${compact?'compact':'hero'} mode-${mode}" aria-hidden="true"><span class="anatomy-glow"></span><img src="${src}" alt="" loading="eager" decoding="async">${compact?'':`<span class="anatomy-label">${labels[mode]||'Training focus'}</span>`}</span>`;
    }

    function renderHome() {
      const planned=getDay(),day=active?{...planned,title:active.title,focus:active.focus,type:active.type==='rest'?'rest':'lift',exercises:active.exercises.map(entryExercise).filter(Boolean)}:planned,st=stats();
      const isRest=day.type==='rest',resume=Boolean(active),name=state.settings.profileName||'Athlete',weeklyTarget=5,weekPct=clamp(Math.round(st.strengthThisWeek/weeklyTarget*100),0,100);
      const totalVolume=formatVolumeValue(st.totalVolume),nextLabel=resume?'In progress':'Ready now',volumeLabel=st.totalSets?`${totalVolume} ${displayWeightUnit()}`:'Build your baseline',exerciseCount=day.exercises.length,setCount=day.exercises.reduce((sum,ex)=>sum+(Number(ex.sets)||0),0);
      $('#view').innerHTML=`
        <div class="home-screen home-dashboard">
          <div class="home-welcome"><div><h1>Welcome back, ${esc(name)}.</h1><p>${isRest?'Recovery is part of the work.':'Let’s get stronger today.'}</p></div></div>
          <section class="today-card reference-today-card mode-${figureModeForDay(day)} ${isRest?'is-rest':''}">
            ${renderMuscleFigure(day)}
            <div class="today-card-content"><div class="today-kicker"><span>${resume?'Workout in progress':isRest?'Recovery day':`Day ${day.day}`}</span><b>${resume?'Live':'Today'}</b></div><h2>${esc(day.title)}</h2><p class="today-focus">${esc(day.focus)}</p><div class="today-detail-list"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.4 14.6 14.6 9.4M7.1 17a3 3 0 0 1-4.2-4.2l3.2-3.2a3 3 0 0 1 4.2 0M16.9 7a3 3 0 0 1 4.2 4.2l-3.2 3.2a3 3 0 0 1-4.2 0"/></svg>${exerciseCount} exercises · ${setCount} sets</span><span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.2"/><path d="M12 7.2v5l3.4 2.1"/></svg>Est. ${estimatedMinutes(day)} min</span></div></div>
            <div class="today-actions ${isRest&&!resume?'two':''}">${isRest&&!resume?`<button class="btn subtle" data-action="mark-rest">Mark rest day</button>`:''}<button class="btn primary home-start" data-action="${resume?'resume-workout':'start-workout'}">${resume?'Resume workout':isRest?'Start optional recovery':'Start workout'}<span>›</span></button></div>
          </section>
          <button class="quick-workout-launch" data-action="open-quick-builder" ${resume?'disabled':''}><span><b>＋</b><i><strong>Quick Workout</strong><small>${resume?'Finish or cancel the active workout first':'Build an unplanned session or use a saved template'}</small></i></span><em>›</em></button>
          <section class="home-section quick-actions-section"><div class="home-section-title">Quick actions</div><div class="reference-quick-grid"><button data-action="open-body-sheet"><span class="quick-action-icon body-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4.3" r="2.1"/><path d="M12 7v7.2M5.8 9.4 12 11l6.2-1.6M12 14.2 8.6 20M12 14.2l3.4 5.8"/></svg></span><small>Body Weight</small></button><button data-action="open-history"><span class="quick-action-icon history-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.2"/><path d="M12 7.2v5.1l3.5 2"/></svg></span><small>History</small></button><button data-action="open-app" data-app="pf"><span class="quick-action-icon pf-icon">PF</span><small>Planet Fitness</small></button><button data-action="open-app" data-app="music"><span class="quick-action-icon music-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg></span><small>Music</small></button></div></section>
          <section class="home-section progress-summary-section"><div class="home-section-title">Progress summary</div><div class="reference-summary-card"><button data-view="progress" class="summary-row"><span class="summary-icon"><svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14" rx="2.5"/><path d="M8 3.5v4M16 3.5v4M4 10h16"/></svg></span><span class="summary-copy"><b>Strength this week</b><i><span style="width:${weekPct}%"></span></i></span><strong>${st.strengthThisWeek} / ${weeklyTarget} workouts</strong></button><button data-view="progress" class="summary-row"><span class="summary-icon"><svg viewBox="0 0 24 24"><path d="M5 19v-6M10 19V8M15 19v-9M20 19V5"/></svg></span><span class="summary-copy"><b>Total volume</b></span><strong>${esc(volumeLabel)}</strong></button><button data-view="plan" class="summary-row"><span class="summary-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.2"/><path d="M12 7.3v5l3.3 2"/></svg></span><span class="summary-copy"><b>Next workout</b></span><strong>${nextLabel} <em>›</em></strong></button></div></section>
        </div>`;
    }

    function coachBriefItems(day) {
      if(day.type==='rest') return ['Optional walk: keep the pace conversational.', 'Mobility is enough; finish feeling better than you started.'];
      const items=[];
      for(const ex of day.exercises.filter(ex=>ex.type==='weighted'||ex.type==='bodyweight')){
        const note=state.exerciseProgress[ex.id]?.note;
        if(note) items.push(`${ex.name}: ${note}`);
        if(items.length===2) break;
      }
      if(!items.length) items.push('Use clean working sets and leave 1–2 reps in reserve.', 'Keep the same working weight across your counted sets.');
      if(items.length===1) items.push('Finish with the planned cardio at a controlled pace.');
      return items;
    }

    function renderCoachBrief(day) {
      return coachBriefItems(day).map((text,i)=>`<div class="coach-line"><div class="coach-icon">${i+1}</div><div><span class="muted">${esc(text)}</span></div></div>`).join('');
    }

    function renderQuickLaunch() { return `<div class="quick-launch"><button data-action="open-app" data-app="pf"><span class="quick-badge">PF</span><span>Planet Fitness</span></button><button data-action="open-app" data-app="music"><span class="quick-badge">♫</span><span>Apple Music</span></button></div>`; }

    function renderWeekDots() {
      const today=new Date();today.setHours(0,0,0,0);const done=new Set(state.history.map(s=>dateKey(s.startedAt)));let out='';
      for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);out+=`<i class="${done.has(dateKey(d))?'done':''} ${i===0?'today':''}"></i>`;}
      return out;
    }

    function renderWeekStrip() {
      const today=new Date();today.setHours(0,0,0,0);
      const done=new Map();
      state.history.forEach(s=>done.set(dateKey(s.startedAt),s.type==='rest'?'rest':'lift'));
      let html='';
      for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);const key=dateKey(d), status=done.get(key);html+=`<div class="day-cell ${status?'done':''} ${i===0?'today':''}"><span>${d.toLocaleDateString(undefined,{weekday:'short'}).slice(0,2)}</span><b>${d.getDate()}</b><span>${status==='rest'?'☁️':status?'✓':'·'}</span></div>`;}
      return `<div class="week-strip">${html}</div>`;
    }

    function renderWorkoutPreview() {
      const day=getDay(),plan=getPlan();
      $('#view').innerHTML=`<div class="stack workout-preview-v21">
        <section class="card workout-brief-card"><div class="card-pad">
          <div class="workout-brief-top"><div><div class="eyebrow">Day ${day.day} of ${plan.length}</div><h1>${esc(day.title)}</h1><p>${esc(day.focus)}</p></div><div class="brief-logo"><img src="nexset-mark.svg" alt=""></div></div>
          <div class="brief-stats"><span>${estimatedMinutes(day)} min</span><span>${day.exercises.length} exercises</span><span>${day.type==='rest'?'Recovery':'Lift day'}</span></div>
          <div class="brief-note"><strong>Warm-up</strong><span>${esc(day.warmup)}</span></div>
          <div class="today-actions ${day.type==='rest'?'two':''}">${day.type==='rest'?'<button class="btn subtle" data-action="mark-rest">Mark rest day</button>':''}<button class="btn primary" data-action="start-workout">${day.type==='rest'?'Start optional recovery':'Start workout'}<span>→</span></button></div>
          <div class="flex-workout-actions"><button class="btn" data-action="open-program-editor" data-index="${state.settings.currentDayIndex}">Edit workout</button><button class="btn" data-action="open-quick-builder">Quick workout</button></div>
        </div></section>
        <details class="card workout-list-collapsed"><summary><div><strong>Workout plan</strong><span>${day.exercises.length} exercises · tap to view</span></div><span>⌄</span></summary><div class="workout-list-body">${day.exercises.map((ex,i)=>`<div class="plan-exercise-row"><span>${i+1}</span><div><strong>${esc(ex.name)}</strong><small>${esc(ex.equipment||'')}</small></div><b>${esc(targetLabel(ex))}</b></div>`).join('')}</div></details>
        <div class="day-selector-row"><label>Choose day</label><select data-action="change-day">${plan.map((d,i)=>`<option value="${i}" ${i===state.settings.currentDayIndex?'selected':''}>Day ${d.day} · ${esc(d.title)}</option>`).join('')}</select></div>
      </div>`;
    }

    function startWorkout() {
      if(active){currentView='workout';render();showToast('Your unfinished workout was resumed.');return;}
      const day=getDay(); active={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),schemaVersion:DATA_SCHEMA_VERSION,storageWeightUnit:STORAGE_WEIGHT_UNIT,isQuick:false,dayIndex:state.settings.currentDayIndex,day:day.day,title:day.title,type:day.type,focus:day.focus,startedAt:new Date().toISOString(),sessionNote:'',restTimer:null,currentExerciseIndex:0,exercises:day.exercises.map((ex,index)=>makeActiveEntry(ex,index))};
      saveActive({reason:'workout-start'});currentView='workout';render();showToast(day.type==='rest'?'Recovery session started.':'Workout started.');
    }

    function initialWeight(ex) { const p=state.exerciseProgress[ex.id]||exerciseAliases(ex.id).map(id=>state.exerciseProgress[id]).find(Boolean); if(ex.type==='weighted') return Number.isFinite(Number(p?.nextWeight))?Number(p.nextWeight):Number.isFinite(Number(p?.lastWeight))?Number(p.lastWeight):null; return null; }
    function initialReps(ex) { const prev=getPreviousExercise(ex.id),logs=prev?workingLogs(prev.entry.logs||[]):[],last=logs.at(-1);if(ex.type==='cardio'||ex.type==='timed')return Number.isFinite(Number(last?.duration))?Math.max(1,Number(last.duration)):ex.min;return Number.isFinite(Number(last?.reps))?clamp(Number(last.reps),1,999):ex.min; }

    function exerciseAliases(id) {
      const aliases={smith_squat:['smith_squat_box'],leg_press_45:['leg_press'],romanian_deadlift:['smith_rdl']};
      return [id,...(aliases[id]||[])];
    }
    function previousWorkingSet(ex, entry) {
      const current=workingLogs(entry?.logs||[]).at(-1);
      if(current) return {label:formatLogShort(ex,current),source:'This workout'};
      const prev=getPreviousExercise(ex.id), last=prev?workingLogs(prev.entry.logs||[]).at(-1):null;
      return last?{label:formatLogShort(ex,last),source:'Last workout'}:null;
    }
    function renderSetReferences(ex,entry) {
      if(ex.type!=='weighted'&&ex.type!=='bodyweight') return '';
      const previous=previousWorkingSet(ex,entry);
      const p=state.exerciseProgress[ex.id]||exerciseAliases(ex.id).map(id=>state.exerciseProgress[id]).find(Boolean);
      const suggested=nextTargetLabel(ex,p);
      return `<div class="set-reference-row"><div class="set-reference"><span>${esc(previous?.source||'Previous set')}</span><strong>${esc(previous?.label||'No previous set')}</strong></div><div class="set-reference"><span>Suggested next</span><strong>${esc(suggested)}</strong></div></div>`;
    }

    function renderFocusFooter(ex,entry,index,total) {
      const workingCount=workingLogs(entry?.logs||[]).length,target=Math.max(1,Number(ex?.sets)||1),complete=workingCount>=target,skipped=entry?.status==='skipped';
      const leftAction=index>0?'previous-exercise':'pause-workout',leftLabel=index>0?'← Previous':'Pause';
      let action='log-set',label='';
      if(skipped){action='return-exercise';label='Return Exercise';}
      else if(!complete){if(entry?.draftWarmup)label='Log Warm-Up';else if(ex?.type==='cardio'||ex?.type==='timed')label=`Log ${cleanNumber(entry?.draftReps||ex.min)} ${ex.unit||'min'}`;else label=`Log Set ${workingCount+1}`;}
      else {const remaining=active.exercises.some((item,i)=>i!==index&&item.status!=='skipped'&&activeEntryStatus(item)!=='done'),skippedCount=active.exercises.filter(item=>item.status==='skipped').length;if(remaining){action='next-open-exercise';label='Next Open Exercise';}else if(skippedCount){action='open-workout-list';label='Review Workout';}else{action='finish-workout';label='Finish Workout';}}
      return `<footer class="focus-bottom"><button class="focus-nav-btn" data-action="${leftAction}">${leftLabel}</button><div class="focus-elapsed" id="elapsed">${formatDuration(Date.now()-new Date(active.startedAt))}</div><button class="focus-nav-btn primary ${complete?'complete-action':'log-action'}" data-action="${action}">${esc(label)}</button></footer>`;
    }

    function renderFocusWorkout() {
      if(!active){currentView='workout';renderWorkoutPreview();return;}
      active.currentExerciseIndex=clamp(Number(active.currentExerciseIndex)||0,0,Math.max(0,active.exercises.length-1));
      const index=active.currentExerciseIndex,entry=active.exercises[index],ex=entryExercise(entry),total=active.exercises.length;
      const eligible=active.exercises.filter(e=>e.status!=='skipped'),completed=eligible.filter(e=>activeEntryStatus(e)==='done').length,skipped=active.exercises.filter(e=>e.status==='skipped').length;
      const targetSets=eligible.reduce((sum,e)=>sum+Math.max(1,Number(entryExercise(e)?.sets)||1),0);
      const completedSets=eligible.reduce((sum,e)=>{const target=Math.max(1,Number(entryExercise(e)?.sets)||1);return sum+Math.min(target,workingLogs(e.logs||[]).length);},0);
      const progress=targetSets?clamp(Math.round(completedSets/targetSets*100),0,100):100;
      $('#view').innerHTML=`<div class="focus-shell">
        <header class="focus-header"><button class="focus-close" data-action="pause-workout" aria-label="Pause workout">×</button><button class="focus-title focus-title-button" data-action="open-workout-list" aria-label="Open exercise list"><img class="focus-mini-brand" src="nexset-mark.svg" alt=""><strong>Exercise ${index+1} of ${total}</strong><span>${esc(active.title)}</span></button><button class="focus-menu" data-action="open-exercise-tools" aria-label="Exercise options">•••</button></header>
        <button class="focus-progress focus-progress-button" data-action="open-workout-list"><div class="focus-progress-top"><span>${completedSets} / ${targetSets} sets${completed?` · ${completed} done`:''}${skipped?` · ${skipped} skipped`:''}</span><span>${progress}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div></button>
        <main class="exercise-stage" id="exerciseStage">${renderFocusCard(ex,entry,index,total)}</main>
        ${renderFocusFooter(ex,entry,index,total)}
      </div>`;
      bindSwipe();startElapsedClock();
    }

    function renderFocusCard(ex, entry, index, total) {
      if(!ex)return '<div class="empty">Exercise unavailable.</div>';
      const logs=entry.logs||[],working=workingLogs(logs),targetHit=working.length>=ex.sets,skipped=entry.status==='skipped';
      const weight=Number.isFinite(Number(entry.draftWeight))?Number(entry.draftWeight):(initialWeight(ex)||''),reps=Number.isFinite(Number(entry.draftReps))?Number(entry.draftReps):ex.min;
      const note=String(entry?.notes||'').trim(),setup=savedSetupFor(ex.id),notePreview=note?`${note.slice(0,64)}${note.length>64?'…':''}`:setup?`Setup: ${setup.slice(0,58)}${setup.length>58?'…':''}`:'Cues, setup, and workout notes';
      return `<article class="exercise-focus-card ${skipped?'is-skipped':''}"><div class="exercise-card-inner">
        <div class="exercise-card-head"><div class="exercise-card-copy"><span class="exercise-number">${skipped?'Skipped for now':targetHit?'Target complete':`Set ${Math.min(working.length+1,ex.sets)} of ${ex.sets}`}</span><h1 class="exercise-title">${esc(ex.name)}</h1><div class="exercise-target">${esc(targetLabel(ex))} · ${esc(ex.equipment||'')}</div></div></div>
        ${skipped?`<div class="skipped-exercise-state"><span>↪</span><div><strong>This exercise is out of the current flow.</strong><small>Return it when the machine is free, replace it, or finish without it.</small></div></div>`:''}
        <button class="exercise-info-button" data-action="open-exercise-tools" aria-label="Open form guidance and notes"><span class="exercise-info-glyph">i</span><span><strong>Form, setup & notes</strong><small>${esc(notePreview)}</small></span><b>›</b></button>
        ${renderPreviousCard(ex)}
        ${logs.length?`<div class="logged-strip">${logs.slice(-6).map((log,i)=>renderLoggedSet(ex,log,Math.max(0,logs.length-6)+i,index)).join('')}</div>`:''}
        <div class="focus-log-wrap ${skipped?'disabled-log':''}">${skipped?'':renderFocusLogPanel(ex,entry,index,weight,reps)}</div>
      </div></article>`;
    }

    function renderPreviousCard(ex) {
      const prev=getPreviousExercise(ex.id), p=state.exerciseProgress[ex.id]||exerciseAliases(ex.id).map(id=>state.exerciseProgress[id]).find(Boolean);
      if(!prev) return `<div class="previous-compact first-session"><span class="first-session-icon">1</span><div><span>First session</span><strong>Choose a controlled starting load</strong><p>Stop with 1–3 clean reps left and keep every rep smooth.</p></div></div>`;
      const logs=workingLogs(prev.entry.logs||[]);
      const suggestion=nextTargetLabel(ex,p);
      return `<div class="previous-compact"><div class="previous-summary-row"><div><span>Last workout · ${fmtDate(prev.session.startedAt)}</span><div class="previous-set-row">${logs.slice(-4).map(log=>`<b>${esc(formatLogShort(ex,log))}</b>`).join('')}</div></div><div class="next-target"><span>Suggested</span><strong>${esc(suggestion)}</strong></div></div><p><span>Coach</span>${esc(p?.note||'Repeat the last clean setup.')}</p></div>`;
    }

    function renderLoggedSet(ex, log, setIndex, exerciseIndex) {
      const label=formatLogShort(ex,log), feelClass=['easy','good','hard'].includes(log.feel)?log.feel:'good';
      const meta=log.warmup?'Warm-up':`<i class="set-feel-dot ${feelClass}" aria-hidden="true"></i>Set ${workingLogs((active?.exercises?.[exerciseIndex]?.logs)||[]).indexOf(log)+1||setIndex+1}`;
      return `<button class="logged-set ${log.warmup?'warmup':''}" data-action="edit-set" data-set-index="${setIndex}" data-exercise-index="${exerciseIndex}" title="Edit set"><b>${esc(label)}</b><span class="logged-set-meta">${meta}</span></button>`;
    }

    function renderFocusLogPanel(ex, entry, index, weight, reps) {
      const feel=entry.draftFeel||'good', workingCount=workingLogs(entry.logs||[]).length, targetHit=workingCount>=ex.sets;
      const extraSet=targetHit&&ex.type!=='cardio'&&ex.type!=='timed'?`<button class="log-set-btn extra-set-btn" data-action="log-set">+ Log Extra Set</button>`:'';
      if(ex.type==='weighted'){
        const shown=Number.isFinite(Number(weight))?roundedDisplayWeight(weight):'';
        const step=displayIncrement(ex);
        return `<div class="compact-log-panel"><div class="control-grid"><div class="control-block"><div class="control-label"><span>Weight</span><small>${displayWeightUnit()}</small></div><div class="compact-stepper"><button data-action="adjust-weight" data-delta="-${step}">−</button><input inputmode="decimal" data-input="weight" value="${esc(shown)}" placeholder="0"><button data-action="adjust-weight" data-delta="${step}">+</button></div>${Number.isFinite(Number(state.exerciseProgress[ex.id]?.nextWeight))?'<div class="prefill-badge">Suggested weight prefilled</div>':''}</div><div class="control-block"><div class="control-label"><span>Reps</span><small>${ex.min}–${ex.max}</small></div><div class="compact-stepper"><button data-action="adjust-reps" data-delta="-1">−</button><input inputmode="numeric" data-input="reps" value="${esc(reps)}"><button data-action="adjust-reps" data-delta="1">+</button></div><div class="rep-hint">Target ${ex.min}–${ex.max}</div></div></div>${renderFeelOnly(entry,feel)}${extraSet}</div>`;
      }
      if(ex.type==='bodyweight') return `<div class="compact-log-panel single-control"><div class="control-block"><div class="control-label"><span>Reps</span><small>${ex.min}–${ex.max}</small></div><div class="compact-stepper"><button data-action="adjust-reps" data-delta="-1">−</button><input inputmode="numeric" data-input="reps" value="${esc(reps)}"><button data-action="adjust-reps" data-delta="1">+</button></div></div>${renderFeelOnly(entry,feel)}${extraSet}</div>`;
      const duration=Number.isFinite(Number(entry.draftReps))?Number(entry.draftReps):ex.min,durationStep=Math.max(.25,Number(ex.increment)||1);
      return `<div class="compact-log-panel single-control"><div class="control-block"><div class="control-label"><span>Duration</span><small>${esc(ex.unit||'min')}</small></div><div class="compact-stepper"><button data-action="adjust-duration" data-delta="-${durationStep}">−</button><input inputmode="decimal" data-input="duration" value="${esc(duration)}"><button data-action="adjust-duration" data-delta="${durationStep}">+</button></div><div class="rep-hint">Target ${ex.min}–${ex.max} ${esc(ex.unit||'min')} · step ${cleanNumber(durationStep)}</div></div></div>`;
    }

    function renderRepAndFeel(entry,reps,feel) { return renderFeelOnly(entry,feel); }
    function renderFeelOnly(entry,feel) { return `<div class="feel-row"><button class="feel-btn easy ${feel==='easy'?'active':''}" data-action="set-feel" data-feel="easy">Easy</button><button class="feel-btn right ${feel==='good'?'active':''}" data-action="set-feel" data-feel="good">Just right</button><button class="feel-btn hard ${feel==='hard'?'active':''}" data-action="set-feel" data-feel="hard">Hard</button></div><label class="warm-compact"><div><span>Warm-up set</span><small>Tracked separately and does not count toward your working sets or stats.</small></div><input type="checkbox" data-input="warmup" ${entry.draftWarmup?'checked':''}></label>`; }

    function renderExerciseSheet(ex,entry,index){
      const skipped=entry.status==='skipped',setup=savedSetupFor(ex.id),quick=Boolean(active?.isQuick),hasPrev=index>0,hasNext=index<(active?.exercises?.length||1)-1;
      return `<div class="sheet-backdrop exercise-sheet-overlay" id="exerciseSheetOverlay"><section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="Exercise details"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">Exercise details</span><h2>${esc(ex.name)}</h2></div><button data-action="close-exercise-tools" aria-label="Close">×</button></div>
      <div class="sheet-section flexibility-panel"><strong class="sheet-section-title">Workout flexibility</strong><div class="flexibility-grid"><button data-action="${skipped?'return-exercise':'skip-exercise'}">${skipped?'↩ Return':'↪ Skip for now'}</button><button data-action="open-replacement-picker" data-index="${index}">⇄ Replace</button><button data-action="open-workout-list">☷ Exercise list</button><button data-action="add-active-exercise">＋ Add exercise</button></div><div class="move-row"><button data-action="move-active-exercise" data-delta="-1" ${hasPrev?'':'disabled'}>↑ Move earlier</button><button data-action="move-active-exercise" data-delta="1" ${hasNext?'':'disabled'}>↓ Move later</button></div>${quick?'':'<small>Replacements can apply only today or update the routine for future workouts.</small>'}</div>
      <div class="sheet-section"><strong class="sheet-section-title">Quick guide</strong><div class="sheet-meta-chips"><span class="sheet-chip">${esc(targetLabel(ex))}</span><span class="sheet-chip">${esc(ex.equipment||'Gym floor')}</span><span class="sheet-chip">${Number(ex.restSeconds)||state.settings.restSeconds}s rest</span></div><p class="guide-cue">${esc(ex.cues||'Use controlled reps and clean form.')}</p></div>
      <div class="sheet-section"><strong class="sheet-section-title">How to do it</strong><ol class="cue-steps">${exerciseSteps(ex).map(step=>`<li>${esc(step)}</li>`).join('')}</ol></div>
      <div class="sheet-section"><label class="sheet-section-title">Saved equipment setup</label><textarea data-input="saved-setup" placeholder="Seat 4, back pad 2, neutral handles, bench notch…">${esc(setup)}</textarea><button class="btn setup-save" data-action="save-exercise-setup" data-exercise-id="${esc(ex.id)}">Save setup for next time</button></div>
      <div class="sheet-section"><label class="sheet-section-title">Exercise note</label><textarea data-input="exercise-note" placeholder="How it felt, discomfort, changes for today…">${esc(entry.notes||'')}</textarea></div>
      <div class="sheet-section"><label class="sheet-section-title">Workout note</label><textarea data-input="session-note" placeholder="Energy, pain, changes, or context for the whole workout…">${esc(active?.sessionNote||'')}</textarea></div>
      ${ex.name.includes('Smith Machine')?`<div class="sheet-section">${renderPlateTool(ex,index,entry.draftWeight)}</div>`:''}<button class="btn primary block sheet-done" data-action="close-exercise-tools">Done</button><details class="sheet-danger"><summary>Workout controls <span>⌄</span></summary><div><button class="btn danger block" data-action="delete-last-set">Delete last set</button><button class="btn danger block" data-action="cancel-workout">Cancel workout</button></div></details></section></div>`;
    }

    function renderExerciseNoteChip(entry) {
      const note = String(entry?.notes || '').trim();
      if (!note) return '<button class="exercise-note-chip empty" data-action="open-exercise-tools" aria-label="Add an exercise note">📝 Add note</button>';
      return `<button class="exercise-note-chip" data-action="open-exercise-tools" aria-label="Edit exercise note"><strong>📝 Note</strong><span>${esc(note)}</span></button>`;
    }

    function nextTargetLabel(ex, progress) {
      if (!progress) return 'Repeat last clean setup';
      if (ex.type === 'weighted' && Number.isFinite(Number(progress.nextWeight))) return formatWeightValue(progress.nextWeight);
      if ((ex.type === 'cardio' || ex.type === 'timed') && Number.isFinite(Number(progress.nextDuration))) return `${cleanNumber(progress.nextDuration)} ${ex.unit||'min'}`;
      return progress.lastSummary || progress.note || 'Repeat last clean setup';
    }

    function exerciseSteps(ex) {
      if(Array.isArray(ex?.steps)&&ex.steps.length)return ex.steps;
      const map={
        smith_bench:['Set the bench so the bar lowers to mid-chest and plant both feet firmly.','Retract your shoulder blades, unlock the bar, and lower it under control.','Press up without bouncing or letting your shoulders roll forward.'],
        incline_db_press:['Set a moderate incline and brace your feet before lifting the dumbbells.','Lower the weights beside your upper chest with wrists stacked over elbows.','Press up and slightly inward while keeping your shoulder blades set.'],
        machine_chest_fly:['Adjust the seat so the handles line up with mid-chest.','Keep a soft elbow bend and bring the pads together using your chest.','Pause at the squeeze, then return only as far as your shoulders stay comfortable.'],
        seated_db_shoulder_press:['Set the bench nearly upright and keep your back against the pad.','Start with elbows slightly forward and wrists over elbows.','Press overhead without arching your lower back or shrugging.'],
        cable_lateral_raise:['Set the cable low and stand tall with the handle across your body.','Lead with your elbow and raise the arm to about shoulder height.','Pause briefly and lower slowly without leaning or swinging.'],
        rope_tricep_pushdown:['Set the pulley high and pin your elbows beside your ribs.','Extend your elbows and split the rope at the bottom.','Return under control without letting your shoulders roll forward.'],
        overhead_cable_triceps:['Face away from a high cable and brace your ribs down.','Keep your upper arms still while bending your elbows into a full stretch.','Extend smoothly and finish without flaring your ribs.'],
        incline_treadmill_push:['Start at an easy pace before raising the incline.','Walk tall with short controlled steps and light hand contact only if needed.','Finish at a pace that supports recovery rather than exhausting you.'],
        lat_pulldown:['Set the thigh pad snugly and take a grip just outside shoulder width.','Lift your chest and pull your elbows down toward your ribs.','Stop near the upper chest, then return with control without rocking.'],
        seated_cable_row:['Plant your feet and sit tall with a neutral spine.','Pull the handle toward your lower ribs while keeping your torso still.','Pause with shoulder blades together, then reach forward under control.'],
        chest_supported_row:['Adjust the seat so your chest stays firmly against the pad.','Drive your elbows back without lifting your chest from the support.','Pause at the squeeze and lower the weight slowly.'],
        cable_face_pull:['Set the rope around eye level and step back into a stable stance.','Pull toward your eyebrows while spreading the rope and keeping elbows high.','Pause with shoulder blades set, then return without shrugging.'],
        db_hammer_curl:['Stand tall with palms facing inward and elbows beside your ribs.','Curl without swinging or letting the elbows drift forward.','Squeeze briefly and lower the dumbbells all the way under control.'],
        cable_curl:['Set the pulley low and keep your shoulders stacked over your hips.','Curl while your upper arms remain still.','Pause at the top and lower until the elbows are fully extended.'],
        captains_chair_knee_raise:['Press your back into the pad and support yourself through the forearms.','Curl your pelvis upward as you raise your knees instead of only flexing the hips.','Lower slowly and stop any swinging before the next rep.'],
        stair_or_bike_pull:['Begin easy and settle into a sustainable cadence.','Keep your posture tall and breathing controlled.','Finish feeling trained but ready to recover.'],
        easy_walk_recovery:['Choose a pace that lets you speak in full sentences.','Keep your shoulders relaxed and use a natural stride.','End the walk feeling looser and more energized.'],
        optional_steps_rest:['Choose an easy walking pace that keeps your breathing conversational.','Use relaxed, natural steps and avoid turning the recovery day into conditioning work.','Stop while you still feel refreshed and ready for the next training day.'],
        mobility_flow:['Move slowly through hips, hamstrings, chest, and upper back.','Use pain-free ranges and breathe into each position.','Do not force end range; the goal is easier movement afterward.'],
        stretch_recovery:['Ease into each stretch without bouncing.','Hold gentle tension while breathing slowly.','Back off immediately from sharp, numb, or radiating discomfort.'],
        light_stretch_rest:['Select one or two comfortable stretches for the areas that feel tight.','Ease into mild tension, breathe slowly, and avoid bouncing.','Finish after a few minutes and stop immediately if a position causes sharp or radiating pain.'],
        smith_squat:['Set the bar around upper-chest height and place your feet slightly forward.','Brace, unlock the bar, and sit straight down while tracking knees over toes.','Drive through mid-foot and finish tall without losing rib position.'],
        romanian_deadlift:['Hold the dumbbells close to your thighs with soft knees.','Push your hips back until your hamstrings are loaded while keeping a neutral spine.','Drive the floor away and stand tall without leaning back.'],
        leg_press_45:['Set your full feet shoulder-width on the platform and release the safeties.','Lower the sled under control while keeping hips and lower back against the pad.','Press through mid-foot and stop short of snapping your knees straight.'],
        leg_extension:['Align your knee with the machine pivot and set the pad above your ankles.','Extend smoothly and pause with the quads contracted.','Lower under control without letting the stack slam.'],
        leg_extension_b:['Align your knee with the machine pivot and place the roller just above your ankles.','Extend without lifting your hips from the seat and pause with the quads tight.','Lower slowly and stop before the weight stack touches down.'],
        seated_leg_curl_a:['Align your knee with the pivot and secure the thigh pad.','Curl the pad down while keeping your hips firmly in the seat.','Squeeze the hamstrings, then return slowly to a comfortable stretch.'],
        standing_calf_raise:['Place the balls of your feet securely on the platform.','Lower your heels into a controlled stretch.','Rise as high as possible, pause, and avoid bouncing.'],
        bike_or_walk_legs_a:['Start easy while your legs recover from lifting.','Use a steady pace with relaxed breathing.','Finish refreshed enough for the next training day.'],
        machine_chest_press:['Adjust the seat so the handles begin around mid-chest.','Keep shoulder blades against the pad and press without bouncing.','Stop just short of hard elbow lockout and return slowly.'],
        neutral_lat_pulldown:['Secure the thigh pad and use the neutral handles.','Pull elbows down and in while keeping the chest tall.','Control the return without letting the stack pull you upward.'],
        reverse_pec_deck:['Set the seat so handles align near shoulder height.','Keep a soft elbow bend and sweep the arms apart using the rear delts.','Pause without shrugging, then return slowly.'],
        seated_cable_row_def:['Sit tall and begin with arms long without rounding your lower back.','Pull toward the ribs and squeeze the shoulder blades.','Return smoothly while keeping torso movement minimal.'],
        machine_shoulder_press:['Adjust the seat so handles start near shoulder height.','Brace against the pad and press along the machine path.','Stop short of painful depth or hard lockout and lower slowly.'],
        db_lateral_raise:['Stand tall with light dumbbells beside your thighs.','Lead with elbows and raise to shoulder height without swinging.','Lower for two to three seconds and keep the traps relaxed.'],
        rope_pushdown_upper:['Pin elbows beside your body before the first rep.','Extend fully and separate the rope at the bottom.','Return slowly while the upper arms remain still.'],
        cable_curl_upper:['Set the cable low and lock your shoulders in place.','Curl through a full range without leaning back.','Squeeze at the top and lower under control.'],
        treadmill_intervals_upper:['Warm up before the first hard interval.','Alternate the planned hard and easy minutes while staying in control.','Use a pace you can repeat consistently across all rounds.'],
        smith_rdl:['Set the Smith bar around mid-thigh and stand close to it.','Unlock, soften the knees, and push your hips back while the bar tracks your legs.','Stand by driving hips forward and keep your spine neutral.'],
        high_foot_leg_press:['Place feet higher on the platform with the full foot supported.','Lower under control while keeping hips against the pad.','Drive through heels and mid-foot without locking the knees hard.'],
        seated_leg_curl_b:['Align knees with the pivot and secure the thigh pad.','Curl through the strongest pain-free range while keeping hips down.','Pause at the squeeze and return slowly.'],
        cable_glute_kickback:['Attach the ankle strap low and brace against the machine.','Drive the leg back from the hip without arching your lower back.','Pause with the glute tight and return under control.'],
        hip_abduction:['Set the pads comfortably outside the knees and sit tall.','Open the knees using the outer glutes without bouncing.','Pause wide and return slowly without letting the stack slam.'],
        hip_abductor:['Set the pads against the outside of your knees and keep your hips against the seat.','Drive the knees apart using the outer glutes without rocking your torso.','Pause in the open position and control the return without letting the stack slam.'],
        seated_calf_raise:['Place the balls of your feet on the platform and secure the thigh pad.','Lower heels into a full controlled stretch.','Press onto your toes, pause high, and lower slowly.'],
        calf_press_leg_press:['Keep the leg-press safeties engaged until your feet are secure with only the balls of the feet on the platform.','Hold a soft knee bend and lower your heels into a controlled calf stretch.','Press through the toes, pause at the top, and never let the feet slip toward the platform edge.'],
        bike_legs_b:['Begin at low resistance to flush the legs.','Maintain a smooth cadence and controlled breathing.','End before the pace interferes with recovery.'],
        smith_incline_press:['Set a low-to-moderate incline so the bar reaches upper chest.','Retract your shoulder blades and lower the bar smoothly.','Press without bouncing or letting your shoulders glide forward.'],
        close_neutral_pulldown:['Secure the thigh pad and use a close neutral handle.','Pull elbows toward your pockets while keeping the torso quiet.','Pause near the upper chest and control the stretch overhead.'],
        smith_box_squat:['Set the box for a controlled depth and place feet slightly forward.','Brace and sit back to a light touch without relaxing on the box.','Drive up through mid-foot while keeping knees tracking over toes.'],
        incline_db_curl:['Set the bench on an incline and let the arms hang naturally.','Curl without moving the upper arms forward.','Squeeze, then lower completely under control.'],
        rope_overhead_extension:['Face away from the cable with ribs braced down.','Bend the elbows into a comfortable triceps stretch.','Extend fully while upper arms stay pointed forward.'],
        cable_crunch:['Kneel far enough from the stack to keep cable tension.','Brace and curl your ribs toward your pelvis instead of pulling with the arms.','Return slowly without overextending your lower back.'],
        treadmill_finisher:['Build into the planned incline and pace gradually.','Stay tall and keep your effort repeatable.','Cool down before stepping off the treadmill.'],
        full_rest:['Prioritize sleep, hydration, and normal daily movement.','Do not add hard training to make up for a missed day.','Resume with the next planned workout when recovered.']
      };
      return map[ex.id]||['Set the machine, bench, or stance before loading the movement.','Use a controlled full range that stays pain-free.','Stop the set when form changes instead of forcing extra reps.'];
    }

    function removeExerciseToolsOverlay() {
      $('#exerciseSheetOverlay')?.remove();
      document.body.classList.remove('exercise-sheet-open');
      exerciseSheetOpen=false;
    }

    function bindExerciseToolsOverlay() {
      const overlay=$('#exerciseSheetOverlay'),sheet=overlay?.querySelector('.bottom-sheet');
      if(!overlay||!sheet)return;
      overlay.addEventListener('click',event=>{if(event.target===overlay)closeExerciseTools();});
      let startY=null;
      sheet.addEventListener('touchstart',event=>{const t=event.changedTouches?.[0];startY=t?t.clientY:null;},{passive:true});
      sheet.addEventListener('touchend',event=>{if(startY===null)return;const t=event.changedTouches?.[0],dy=t?t.clientY-startY:0;startY=null;if(dy>85)closeExerciseTools();},{passive:true});
    }

    function openExerciseTools(){
      if(!active)return;
      syncDraftFromInputs();
      removeExerciseToolsOverlay();
      const index=active.currentExerciseIndex,entry=active.exercises[index],ex=entryExercise(entry);
      if(!entry||!ex)return;
      exerciseSheetOpen=true;
      document.body.classList.add('exercise-sheet-open');
      document.body.insertAdjacentHTML('beforeend',renderExerciseSheet(ex,entry,index));
      bindExerciseToolsOverlay();
    }

    function closeExerciseTools(){
      if(active)syncDraftFromInputs();
      removeExerciseToolsOverlay();
      if(active&&currentView==='workout')renderFocusWorkout();
    }

    function renderPlateTool(ex,index,weight) { const target=Number(weight)||0,bar=Number(state.settings.smithBarWeight)||0;return `<div><strong style="color:#fff">Smith plate calculator</strong><div class="muted" style="margin-top:4px">Target ${esc(formatWeightValue(target))} · starting resistance ${esc(formatWeightValue(bar))}</div><div style="margin-top:8px;color:#fff;font-weight:850">${esc(plateCalculation(target,bar))}</div></div>`; }

    function plateCalculation(totalStorage,barStorage) {
      if(!Number.isFinite(totalStorage)||totalStorage<=0) return 'Enter a target weight.';
      const unit=displayWeightUnit(),total=fromStorageWeight(totalStorage,unit),bar=fromStorageWeight(barStorage,unit),per=Math.max(0,(total-bar)/2);
      const plates=unit==='kg'?[20,15,10,5,2.5,1.25]:[45,35,25,10,5,2.5];let remaining=per,used=[];
      for(const p of plates){const count=Math.floor((remaining+.001)/p);for(let i=0;i<count;i++)used.push(p);remaining-=count*p;}
      const tolerance=unit==='kg'?0.12:0.2;
      return remaining>tolerance?`${cleanNumber(per)} ${unit} per side (closest plates vary)`:`Per side: ${used.length?used.join(' + '):'no plates'} ${unit}`;
    }

    function getPreviousExercise(id) {
      const ids=exerciseAliases(id);
      const sessions=[...state.history].sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt));
      for(const session of sessions){const entry=(session.exercises||[]).find(e=>ids.includes(e.id) && (e.logs||[]).length);if(entry)return{session,entry};} return null;
    }

    function formatLogShort(ex,log) {
      if(ex.type==='weighted') return `${log.warmup?'WU ':''}${cleanNumber(roundedDisplayWeight(log.weight))}×${cleanNumber(log.reps)} ${displayWeightUnit()}`;
      if(ex.type==='bodyweight') return `${log.warmup?'WU ':''}${cleanNumber(log.reps)} reps${log.weight?` +${formatWeightValue(log.weight)}`:''}`;
      return `${cleanNumber(log.duration)} ${ex.unit||'min'}`;
    }

    function syncDraftFromInputs() {
      if(!active) return; const entry=active.exercises[active.currentExerciseIndex], ex=entryExercise(entry); if(!entry||!ex)return;
      const weight=Number($('[data-input="weight"]')?.value); if(Number.isFinite(weight)&&weight>=0) entry.draftWeight=toStorageWeight(weight);
      const reps=Number($('[data-input="reps"]')?.value); if(Number.isFinite(reps)&&reps>0) entry.draftReps=reps;
      const duration=Number($('[data-input="duration"]')?.value); if(Number.isFinite(duration)&&duration>0) entry.draftReps=duration;
      const note=$('[data-input="exercise-note"]')?.value; if(typeof note==='string') entry.notes=note;
      const sessionNote=$('[data-input="session-note"]')?.value; if(typeof sessionNote==='string') active.sessionNote=sessionNote;
      const warmup=$('[data-input="warmup"]'); if(warmup) entry.draftWarmup=Boolean(warmup.checked);
      saveActive();
    }

    function adjustDraft(kind,delta) {
      if(!active)return;
      syncDraftFromInputs();
      const entry=active.exercises[active.currentExerciseIndex],ex=entryExercise(entry);if(!entry||!ex)return;
      if(kind==='weight'){const current=fromStorageWeight(Number(entry.draftWeight)||0),next=Math.max(0,Math.round((current+Number(delta))*100)/100);entry.draftWeight=toStorageWeight(next);}
      if(kind==='reps'||kind==='duration'){const current=Number(entry.draftReps)||ex.min;entry.draftReps=Math.max(1,Math.round((current+Number(delta))*100)/100);}
      saveActive();renderFocusWorkout();
    }

    function setFeel(feel) { if(!active)return; syncDraftFromInputs(); const entry=active.exercises[active.currentExerciseIndex];entry.draftFeel=['easy','good','hard'].includes(feel)?feel:'good';saveActive();renderFocusWorkout(); }

    function logSet() {
      if(!active)return;
      syncDraftFromInputs();
      const index=active.currentExerciseIndex,entry=active.exercises[index],ex=entryExercise(entry);if(!entry||!ex)return;
      const warmup=Boolean(entry.draftWarmup),feel=entry.draftFeel||'good';
      if(ex.type==='weighted'){
        const weight=Number(entry.draftWeight),reps=Number(entry.draftReps);if(!Number.isFinite(weight)||weight<=0||!Number.isFinite(reps)||reps<=0){showToast('Enter weight and reps.');return;}
        entry.logs.push({weight,reps,feel,warmup,at:new Date().toISOString()});
      } else if(ex.type==='bodyweight'){
        const reps=Number(entry.draftReps);if(!Number.isFinite(reps)||reps<=0){showToast('Enter reps.');return;}entry.logs.push({reps,weight:null,feel,warmup,at:new Date().toISOString()});
      } else {
        const duration=Number(entry.draftReps);if(!Number.isFinite(duration)||duration<=0){showToast('Enter duration.');return;}entry.logs.push({duration,note:$('[data-input="cardio-note"]')?.value?.trim()||'',at:new Date().toISOString()});
      }
      entry.draftFeel='good';entry.draftWarmup=false;saveActive({reason:'set-log'});renderFocusWorkout();
      const exerciseRest=Number(ex.restSeconds),restDuration=Number.isFinite(exerciseRest)?exerciseRest:Number(state.settings.restSeconds)||90;
      if(state.settings.autoRest&&ex.type!=='cardio'&&ex.type!=='timed'&&restDuration>0)startRest(restDuration);
      else showToast(`${ex.name} logged.`);
    }

    function deleteLastSet() {
      if(!active)return;
      const exerciseIndex=active.currentExerciseIndex,entry=active.exercises[exerciseIndex];
      if(!entry.logs.length){showToast('No set to delete.');return;}
      const index=entry.logs.length-1,removed=deepClone(entry.logs[index]);entry.logs.pop();saveActive();renderFocusWorkout();
      showToast('Last set removed.',{label:'Undo',run:()=>{const target=active?.exercises?.[exerciseIndex];if(!target)return;target.logs.splice(index,0,removed);saveActive({reason:'undo-last-set-delete'});if(currentView==='workout')renderFocusWorkout();else render();showToast('Set restored.');}});
    }

    function deleteSpecificSet(setIndex) { openSetEditor(setIndex,active?.currentExerciseIndex); }

    function closeSetEditor(){ $('#setEditorOverlay')?.remove(); setEditorContext=null; }
    function getSetEditorContext(){
      if(!setEditorContext)return null;
      if(setEditorContext.scope==='active'){
        const exerciseIndex=clamp(Number(setEditorContext.exerciseIndex),0,(active?.exercises?.length||1)-1),entry=active?.exercises?.[exerciseIndex],log=entry?.logs?.[setEditorContext.setIndex],ex=entryExercise(entry);
        return active&&entry&&log&&ex?{scope:'active',entry,log,ex,exerciseIndex,setIndex:setEditorContext.setIndex}:null;
      }
      const session=state.history.find(s=>s.id===setEditorContext.sessionId),exerciseIndex=Number(setEditorContext.exerciseIndex),entry=session?.exercises?.[exerciseIndex],log=entry?.logs?.[setEditorContext.setIndex],ex=entryExercise(entry);
      return session&&entry&&log&&ex?{scope:'history',session,entry,log,ex,exerciseIndex,setIndex:setEditorContext.setIndex}:null;
    }
    function openSetEditor(setIndex,exerciseIndex=active?.currentExerciseIndex,sessionId=null){
      closeSetEditor(); setEditorContext={scope:sessionId?'history':'active',sessionId:String(sessionId||''),exerciseIndex:Number(exerciseIndex)||0,setIndex:Number(setIndex)||0};
      const ctx=getSetEditorContext();if(!ctx){setEditorContext=null;showToast('That set is unavailable.');return;}
      const {ex,log}=ctx,weight=Number.isFinite(Number(log.weight))?roundedDisplayWeight(log.weight):'',reps=Number.isFinite(Number(log.reps))?log.reps:'',duration=Number.isFinite(Number(log.duration))?log.duration:'';
      const fields=ex.type==='weighted'?`<div class="mini-grid"><div class="field"><label>Weight (${displayWeightUnit()})</label><input data-edit-set="weight" inputmode="decimal" value="${esc(weight)}"></div><div class="field"><label>Reps</label><input data-edit-set="reps" inputmode="numeric" value="${esc(reps)}"></div></div>`:ex.type==='bodyweight'?`<div class="field"><label>Reps</label><input data-edit-set="reps" inputmode="numeric" value="${esc(reps)}"></div>`:`<div class="field"><label>Duration (${esc(ex.unit||'min')})</label><input data-edit-set="duration" inputmode="decimal" value="${esc(duration)}"></div>`;
      const effort=(ex.type==='weighted'||ex.type==='bodyweight')?`<div class="field"><label>Effort</label><select data-edit-set="feel"><option value="easy" ${log.feel==='easy'?'selected':''}>Easy</option><option value="good" ${!log.feel||log.feel==='good'?'selected':''}>Just right</option><option value="hard" ${log.feel==='hard'?'selected':''}>Hard</option></select></div><label class="warm-toggle"><input type="checkbox" data-edit-set="warmup" ${log.warmup?'checked':''}> Warm-up set</label>`:'';
      document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="setEditorOverlay"><section class="bottom-sheet set-editor-sheet" role="dialog" aria-modal="true" aria-label="Edit set"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">${ctx.scope==='history'?'Completed workout':'Active workout'}</span><h2>Edit ${esc(ex.name)}</h2></div><button data-action="close-set-editor" aria-label="Close">×</button></div><div class="form-grid">${fields}${effort}<div class="button-row"><button class="btn danger" data-action="delete-set-edit">Delete</button><button class="btn primary" data-action="save-set-edit">Save changes</button></div></div></section></div>`);
    }
    function saveSetEdit(){
      const ctx=getSetEditorContext();if(!ctx){closeSetEditor();return;}const {ex,log}=ctx;
      if(ex.type==='weighted'){const weight=Number($('[data-edit-set="weight"]')?.value),reps=Number($('[data-edit-set="reps"]')?.value);if(!(weight>0&&reps>0)){showToast('Enter weight and reps.');return;}log.weight=toStorageWeight(weight);log.reps=reps;}
      else if(ex.type==='bodyweight'){const reps=Number($('[data-edit-set="reps"]')?.value);if(!(reps>0)){showToast('Enter reps.');return;}log.reps=reps;}
      else {const duration=Number($('[data-edit-set="duration"]')?.value);if(!(duration>0)){showToast('Enter duration.');return;}log.duration=duration;}
      const feel=$('[data-edit-set="feel"]')?.value;if(feel)log.feel=['easy','good','hard'].includes(feel)?feel:'good';const warmup=$('[data-edit-set="warmup"]');if(warmup)log.warmup=warmup.checked;log.at=validDateOr(log.at);
      if(ctx.scope==='active')saveActive({reason:'set-edit'});else{rebuildProgress();saveState({reason:'history-set-edit'});}closeSetEditor();if(currentView==='workout')renderFocusWorkout();else if(currentView==='more')renderMore();else render();showToast('Set updated.');
    }
    function deleteSetEdit(){
      const ctx=getSetEditorContext();if(!ctx){closeSetEditor();return;}const removed=deepClone(ctx.log),index=ctx.setIndex,scope=ctx.scope,sessionId=ctx.session?.id,exerciseIndex=ctx.exerciseIndex;ctx.entry.logs.splice(index,1);
      if(scope==='active')saveActive({reason:'set-delete'});else{rebuildProgress();saveState({reason:'history-set-delete'});}closeSetEditor();if(currentView==='workout')renderFocusWorkout();else if(currentView==='more')renderMore();else render();
      showToast('Set deleted.',{label:'Undo',run:()=>{const entry=scope==='active'?active?.exercises?.[exerciseIndex]:state.history.find(s=>s.id===sessionId)?.exercises?.[exerciseIndex];if(!entry)return;entry.logs.splice(index,0,removed);if(scope==='active')saveActive({reason:'undo-set-delete'});else{rebuildProgress();saveState({reason:'undo-history-set-delete'});}render();showToast('Set restored.');}});
    }
    function runToastAction(){const action=toastAction;toastAction=null;$('#toast')?.classList.remove('show');if(action?.run)action.run();}

    function nextExercise(delta=1) { if(!active)return;syncDraftFromInputs();removeExerciseToolsOverlay();active.currentExerciseIndex=clamp(active.currentExerciseIndex+delta,0,active.exercises.length-1);saveActive();renderFocusWorkout(); }
    function nextOpenExercise(){if(!active)return;syncDraftFromInputs();removeExerciseToolsOverlay();active.currentExerciseIndex=nextOpenExerciseIndex(active.currentExerciseIndex,1);saveActive();renderFocusWorkout();}
    function jumpExercise(index){if(!active)return;syncDraftFromInputs();removeExerciseToolsOverlay();closeWorkoutList();active.currentExerciseIndex=clamp(Number(index),0,active.exercises.length-1);saveActive();renderFocusWorkout();}
    function pauseWorkout(){syncDraftFromInputs();removeExerciseToolsOverlay();closeWorkoutList();currentView='home';render();showToast('Workout paused. Your sets are saved.');}
    function skipCurrentExercise(){if(!active)return;syncDraftFromInputs();const entry=active.exercises[active.currentExerciseIndex];if((entry.logs||[]).length&&!confirm('Skip this exercise for now? Logged sets will stay in the workout.'))return;entry.status='skipped';const next=nextOpenExerciseIndex(active.currentExerciseIndex,1);saveActive({reason:'exercise-skip'});removeExerciseToolsOverlay();if(next!==active.currentExerciseIndex)active.currentExerciseIndex=next;saveActive();renderFocusWorkout();showToast('Exercise skipped. You can return from the exercise list.');}
    function returnCurrentExercise(){if(!active)return;const entry=active.exercises[active.currentExerciseIndex];entry.status='open';saveActive({reason:'exercise-return'});removeExerciseToolsOverlay();renderFocusWorkout();showToast('Exercise returned to the workout.');}
    function moveActiveExercise(delta){if(!active)return;syncDraftFromInputs();const from=active.currentExerciseIndex,to=clamp(from+Number(delta),0,active.exercises.length-1);if(from===to)return;const [entry]=active.exercises.splice(from,1);active.exercises.splice(to,0,entry);active.currentExerciseIndex=to;saveActive({reason:'active-exercise-reorder'});removeExerciseToolsOverlay();renderFocusWorkout();showToast('Exercise order updated for this workout.');}

    function closeWorkoutList(){ $('#workoutListOverlay')?.remove(); workoutListOpen=false; }
    function renderWorkoutListSheet(){
      if(!active)return;closeWorkoutList();workoutListOpen=true;
      const rows=active.exercises.map((entry,index)=>{const ex=entryExercise(entry),status=index===active.currentExerciseIndex?'current':activeEntryStatus(entry);const count=workingLogs(entry.logs||[]).length,target=Math.max(1,Number(ex?.sets)||1);return `<button class="workout-list-row ${status}" data-action="jump-workout-exercise" data-index="${index}"><span class="workout-list-number">${index+1}</span><span><b>${esc(ex?.name||'Exercise')}</b><small>${status==='skipped'?'Skipped':status==='done'?'Done':status==='current'?'Current':`${count}/${target} sets`}</small></span><em>${status==='done'?'✓':status==='skipped'?'↪':'›'}</em></button>`;}).join('');
      document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="workoutListOverlay"><section class="bottom-sheet workout-list-sheet" role="dialog" aria-modal="true" aria-label="Exercise list"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">${esc(active.title)}</span><h2>Exercise list</h2></div><button data-action="close-workout-list" aria-label="Close">×</button></div><div class="workout-list-status">${active.exercises.filter(e=>activeEntryStatus(e)==='done').length} done · ${active.exercises.filter(e=>e.status==='skipped').length} skipped · ${active.exercises.length} total</div><div class="workout-list-sheet-rows">${rows}</div><button class="btn block" data-action="add-active-exercise">＋ Add exercise</button><div class="workout-list-finish-row"><button class="btn" data-action="close-workout-list">Continue workout</button><button class="btn primary" data-action="finish-workout">Finish workout</button></div></section></div>`);
    }
    function openWorkoutList(){removeExerciseToolsOverlay();renderWorkoutListSheet();}

    function closeReplacementPicker(){ $('#replacementOverlay')?.remove(); replacementContext=null; }
    function openReplacementPicker(index=active?.currentExerciseIndex, mode='replace'){
      if(!active)return;syncDraftFromInputs();removeExerciseToolsOverlay();closeWorkoutList();const exerciseIndex=clamp(Number(index)||0,0,active.exercises.length-1),entry=active.exercises[exerciseIndex],ex=entryExercise(entry);replacementContext={exerciseIndex,mode,selectedId:null,query:''};renderReplacementPicker();
    }
    function renderReplacementPicker(){
      $('#replacementOverlay')?.remove();if(!replacementContext||!active)return;const {exerciseIndex,mode,selectedId}=replacementContext,current=entryExercise(active.exercises[exerciseIndex]);
      if(selectedId){const chosen=getExercise(selectedId),hasLogs=(active.exercises[exerciseIndex]?.logs||[]).length>0;document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="replacementOverlay"><section class="bottom-sheet replacement-sheet"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">${mode==='add'?'Add exercise':'Replacement selected'}</span><h2>${esc(chosen.name)}</h2></div><button data-action="close-replacement-picker">×</button></div>${mode==='replace'?`<div class="replacement-compare"><div><small>Current</small><strong>${esc(current.name)}</strong></div><span>→</span><div><small>New</small><strong>${esc(chosen.name)}</strong></div></div>${hasLogs?'<div class="builder-note warning">Your logged sets will stay under the original exercise. The replacement will be added immediately after it.</div>':''}`:''}<div class="replacement-scope-actions"><button class="btn primary block" data-action="apply-replacement" data-scope="once">${mode==='add'?'Add to this workout':'This workout only'}</button>${mode==='replace'&&!active.isQuick?'<button class="btn block" data-action="apply-replacement" data-scope="permanent">Use from now on</button>':''}<button class="btn subtle block" data-action="replacement-back">Choose another exercise</button></div></section></div>`);return;}
      const used=new Set(active.exercises.map((entry,i)=>i===exerciseIndex?'':entry.id).filter(Boolean)),source=(mode==='add'?exerciseLibrary():replacementCandidates(current)).filter(ex=>!used.has(ex.id)),query=String(replacementContext.query||'').toLowerCase(),filtered=source.filter(ex=>!query||`${ex.name} ${ex.equipment} ${movementGroup(ex)}`.toLowerCase().includes(query)).slice(0,60);
      document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="replacementOverlay"><section class="bottom-sheet replacement-sheet"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">${mode==='add'?'Workout builder':'Same movement pattern'}</span><h2>${mode==='add'?'Add an exercise':`Replace ${esc(current.name)}`}</h2></div><button data-action="close-replacement-picker">×</button></div><div class="field"><label>Search exercises</label><input data-replacement-search placeholder="Machine, muscle, or exercise…" value="${esc(replacementContext.query||'')}"></div><div class="exercise-library-list">${filtered.length?filtered.map(ex=>`<button data-action="choose-replacement" data-id="${esc(ex.id)}"><span><b>${esc(ex.name)}</b><small>${esc(ex.equipment||'Gym floor')} · ${esc(targetLabel(ex))}</small></span><em>＋</em></button>`).join(''):'<div class="empty compact">No matching exercises.</div>'}</div></section></div>`);
    }
    function applyReplacement(scope='once'){
      if(!active||!replacementContext?.selectedId)return;const index=replacementContext.exerciseIndex,entry=active.exercises[index],oldEx=entryExercise(entry),newEx=normalizeExerciseDefinition(getExercise(replacementContext.selectedId));if(!newEx)return;
      if(replacementContext.mode==='add') {active.exercises.splice(index+1,0,makeActiveEntry(newEx,null));active.currentExerciseIndex=index+1;}
      else if((entry.logs||[]).length){entry.status='open';const added=makeActiveEntry(newEx,entry.planExerciseIndex);added.replacedFrom=oldEx.id;active.exercises.splice(index+1,0,added);active.currentExerciseIndex=index+1;}
      else {active.exercises[index]=makeActiveEntry(newEx,entry.planExerciseIndex);active.exercises[index].notes=entry.notes||'';active.exercises[index].replacedFrom=oldEx.id;active.currentExerciseIndex=index;}
      if(scope==='permanent'&&!active.isQuick&&active.dayIndex>=0){const plan=getPlan(),day=plan[active.dayIndex],planIndex=Number.isInteger(entry.planExerciseIndex)?entry.planExerciseIndex:day.exercises.findIndex(ex=>ex.id===oldEx.id);if(day&&planIndex>=0){day.exercises[planIndex]=deepClone(newEx);state.programPlan=normalizeProgramPlan(plan);saveState({reason:'permanent-exercise-replacement'});}}
      saveActive({reason:'exercise-replacement'});closeReplacementPicker();renderFocusWorkout();showToast(scope==='permanent'?'Exercise replaced today and in your routine.':'Exercise updated for this workout.');
    }
    function saveExerciseSetup(id){const value=$('[data-input="saved-setup"]')?.value?.trim()||'';state.exerciseSetups=state.exerciseSetups||{};if(value)state.exerciseSetups[id]=value;else delete state.exerciseSetups[id];saveState({reason:'exercise-setup'});showToast(value?'Equipment setup saved.':'Saved setup cleared.');}

    function bindSwipe() {
      const stage=$('#exerciseStage');if(!stage)return;
      stage.addEventListener('touchstart',event=>{if(event.target.closest('button,input,textarea,select,summary'))return;const t=event.changedTouches[0];swipeStart={x:t.clientX,y:t.clientY};},{passive:true});
      stage.addEventListener('touchend',event=>{if(!swipeStart)return;const t=event.changedTouches[0],dx=t.clientX-swipeStart.x,dy=t.clientY-swipeStart.y;swipeStart=null;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.25)nextExercise(dx<0?1:-1);},{passive:true});
    }

    function startElapsedClock() { clearInterval(elapsedTimer);elapsedTimer=setInterval(()=>{const el=$('#elapsed');if(active&&el)el.textContent=formatDuration(Date.now()-new Date(active.startedAt));},1000); }

    function startRest(seconds) {
      stopRest(false); if(!active)return; const duration=Math.max(5,Number(seconds)||90),entry=active.exercises[active.currentExerciseIndex];
      restState={start:Date.now(),end:Date.now()+duration*1000,duration,exerciseId:entry?.id||'',setIndex:Math.max(0,(entry?.logs?.length||1)-1)};active.restTimer={...restState};saveActive({reason:'rest-start'});renderRest();restTimer=setInterval(updateRest,250);
    }

    function renderRest() {
      $('#restOverlay')?.remove();if(!restState)return;
      const ex=getExercise(restState?.exerciseId) || (active ? entryExercise(active.exercises?.[active.currentExerciseIndex]) : null);
      document.body.insertAdjacentHTML('beforeend',`<div class="rest-overlay" id="restOverlay"><div class="rest-card"><div class="rest-label">Rest</div><div class="rest-ring" id="restRing"><div class="rest-time" id="restTime">${formatRest(Math.ceil((restState.end-Date.now())/1000))}</div></div><div class="rest-next">Breathe, reset your setup, and get ready for the next ${ex?esc(ex.name):'set'}.</div><div class="rest-actions"><button class="btn" data-action="add-rest">+30 sec</button><button class="btn primary" data-action="skip-rest">Skip rest</button></div></div></div>`);
      updateRest();
    }

    function updateRest() { if(!restState)return;const remaining=Math.max(0,restState.end-Date.now()),pct=(remaining/(restState.duration*1000))*100;const time=$('#restTime'),ring=$('#restRing');if(time)time.textContent=formatRest(Math.ceil(remaining/1000));if(ring)ring.style.setProperty('--rest-pct',`${pct}%`);if(remaining<=0)finishRest(); }

    function formatRest(seconds){const s=Math.max(0,Math.ceil(seconds));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
    function finishRest(){stopRest(true);beep();showToast('Rest complete.');}

    function stopRest(clearStored=true){clearInterval(restTimer);restTimer=null;restState=null;$('#restOverlay')?.remove();if(clearStored&&active?.restTimer){active.restTimer=null;saveActive({reason:'rest-stop'});}}

    function addRest(){if(!restState)return;restState.end+=30000;restState.duration+=30;if(active){active.restTimer={...restState};saveActive({reason:'rest-extend'});}updateRest();}

    function beep(){try{if(state.settings.sound){const Ctx=window.AudioContext||window.webkitAudioContext;const ctx=new Ctx();const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=660;g.gain.setValueAtTime(.08,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.28);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.3);}if(navigator.vibrate)navigator.vibrate([120,60,120]);}catch(_){} }

    function restoreRestTimer(){
      if(!active?.restTimer)return;const timer=active.restTimer;
      if(Number(timer.end)<=Date.now()){active.restTimer=null;saveActive({reason:'expired-rest'});showToast('Your rest period finished while the app was closed.');return;}
      restState={...timer};renderRest();clearInterval(restTimer);restTimer=setInterval(updateRest,250);
    }

    function currentPRScores(){const scores={};for(const ex of exerciseLibrary()){const best=bestSet(ex.id);if(best)scores[ex.id]=best.score;}return scores;}

    function bestSet(id, history=state.history) { let best=null;for(const s of history)for(const e of s.exercises||[]){if(e.id!==id)continue;const ex=entryExercise(e)||getExercise(id);if(!ex)continue;for(const log of workingLogs(e.logs||[])){let score=null;if(ex.type==='weighted'){const w=Number(log.weight),r=Number(log.reps);if(Number.isFinite(w)&&Number.isFinite(r))score=w*(1+r/30);}else if(ex.type==='bodyweight'){score=Number(log.reps);}if(Number.isFinite(score)&&(!best||score>best.score))best={score,log,date:s.startedAt,ex};}}return best; }

    function finishWorkout() {
      if(!active)return;syncDraftFromInputs();const count=active.exercises.reduce((sum,e)=>sum+(e.logs||[]).length,0);if(!count&&!confirm('No activity has been logged. Save this workout anyway?'))return;
      const prior=currentPRScores(),now=new Date().toISOString();const session={...deepClone(active),schemaVersion:DATA_SCHEMA_VERSION,storageWeightUnit:STORAGE_WEIGHT_UNIT,restTimer:null,endedAt:now,completedAt:now,durationMs:new Date(now)-new Date(active.startedAt),prs:[]};
      state.history.push(session);rebuildProgress();
      const seen=new Set();for(const entry of session.exercises||[]){if(seen.has(entry.id))continue;seen.add(entry.id);const after=bestSet(entry.id),before=prior[entry.id];const ex=entryExercise(entry);if(ex&&after&&Number.isFinite(before)&&after.score>before+.01)session.prs.push({exerciseId:entry.id,name:ex.name,value:formatLogShort(ex,after.log),score:after.score,date:now});}
      if(!active.isQuick&&active.dayIndex>=0)state.settings.currentDayIndex=(active.dayIndex+1)%getPlan().length;lastCompletedSession=session;stopRest(false);active=null;removeExerciseToolsOverlay();closeWorkoutList();closeReplacementPicker();saveActive();saveState();currentView='complete';render();
    }

    function markRest() {
      const day=getDay(),now=new Date().toISOString();
      const session={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),schemaVersion:DATA_SCHEMA_VERSION,storageWeightUnit:STORAGE_WEIGHT_UNIT,dayIndex:state.settings.currentDayIndex,day:day.day,title:day.title,type:'rest',focus:day.focus,startedAt:now,endedAt:now,completedAt:now,durationMs:0,sessionNote:'',exercises:[],prs:[]};
      state.history.push(session);state.settings.currentDayIndex=(state.settings.currentDayIndex+1)%getPlan().length;lastCompletedSession=null;saveState();currentView='home';render();showToast(`${day.title} logged. ${getDay().title} is next.`);
    }

    function renderCompletion() {
      const s=lastCompletedSession || [...state.history].sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt))[0];if(!s){currentView='home';render();return;}
      const working=sessionWorkingSets(s),volume=sessionVolume(s),cardio=sessionCardioMinutes(s),recs=(s.exercises||[]).map(e=>({ex:entryExercise(e),p:state.exerciseProgress[e.id]})).filter(x=>x.ex&&x.p?.note).slice(0,2);
      $('#view').innerHTML=`<div class="completion-screen"><div class="completion-brand"><div class="completion-mark"><img src="nexset-mark.svg" alt=""></div><div class="eyebrow">Workout complete</div><h1>${esc(s.title)}</h1><p>Your session is saved.</p></div><div class="completion-stats"><div><span>Duration</span><strong>${formatDuration(s.durationMs)}</strong></div><div><span>Working sets</span><strong>${working}</strong></div><div><span>Volume</span><strong>${formatVolumeValue(volume)}</strong><small>${displayWeightUnit()}</small></div>${cardio?`<div><span>Cardio</span><strong>${cardio}</strong><small>min</small></div>`:''}</div>${s.prs?.length?`<div class="completion-pr"><span>🏆 New PR</span><strong>${esc(s.prs[0].name)}</strong><small>${esc(s.prs[0].value)}${s.prs.length>1?` · +${s.prs.length-1} more`:''}</small></div>`:''}<div class="completion-notes"><span class="section-kicker">Coach notes</span>${recs.length?recs.map(x=>`<p><strong>${esc(x.ex.name)}</strong> · ${esc(x.p.note)}</p>`).join(''):(s.type==='rest'?'<p>Rest day logged. Your next workout is ready when you are.</p>':'<p>Workout saved. Your next session is ready when you are.</p>')}</div><button class="btn primary block completion-button" data-action="complete-done">Return home</button></div>`;
    }

    function analyzeExercise(ex, logs, previous={}) {
      const clean=logs||[],base={lastDate:new Date().toISOString(),completedCount:(previous.completedCount||0)+1,lastSummary:clean.map(l=>formatLogShort(ex,l)).join(', ')};
      if(ex.type==='weighted'){
        const all=clean.filter(l=>Number.isFinite(Number(l.weight))&&Number.isFinite(Number(l.reps))),working=all.filter(l=>!l.warmup),source=(working.length?working:all).slice(-ex.sets);if(!source.length)return{...previous,...base};
        const weights=source.map(l=>Number(l.weight)),reps=source.map(l=>Number(l.reps)),lastWeight=weights.at(-1),same=weights.every(w=>Math.abs(w-lastWeight)<.01),hard=source.filter(l=>l.feel==='hard').length,easy=source.filter(l=>l.feel==='easy').length,major=Math.ceil(source.length/2),step=displayIncrement(ex);
        const shifted=direction=>toStorageWeight(Math.max(0,roundTo(fromStorageWeight(lastWeight)+direction*step,step)));
        let nextWeight=lastWeight,note=`Repeat ${formatWeightValue(lastWeight)} and add reps.`;
        if(source.length<ex.sets)note=`Repeat ${formatWeightValue(lastWeight)}; complete all ${ex.sets} working sets next time.`;
        else if(!same)note=`Use ${formatWeightValue(lastWeight)} as the consistent working weight next time.`;
        else if(reps.every(r=>r>=ex.max)&&hard===0){nextWeight=shifted(1);note=`Increase to ${formatWeightValue(nextWeight)}. You owned the top of the rep range.`;}
        else if(easy>=major&&Math.min(...reps)>=ex.max-1&&hard===0){nextWeight=shifted(1);note=`Try ${formatWeightValue(nextWeight)} if form stays clean.`;}
        else if(reps.some(r=>r<ex.min)&&hard>=major){nextWeight=shifted(-1);note=`Use ${formatWeightValue(nextWeight)} or repeat lighter; too many sets fell below target.`;}
        else if(reps.some(r=>r<ex.min))note=`Stay at ${formatWeightValue(lastWeight)} until every set reaches ${ex.min} reps.`;
        else if(hard>=major)note=`Repeat ${formatWeightValue(lastWeight)} until the sets feel more controlled.`;
        return{...previous,...base,lastWeight,nextWeight,note};
      }
      if(ex.type==='bodyweight'){
        const source=workingLogs(clean).slice(-ex.sets),reps=source.map(l=>Number(l.reps)).filter(Number.isFinite),hard=source.filter(l=>l.feel==='hard').length;let note='Repeat and add clean reps when ready.';if(reps.length&&Math.min(...reps)>=ex.max&&!hard)note='Add 1–3 reps, slow the tempo, or add light resistance.';else if(hard>=Math.ceil(Math.max(1,source.length)/2))note='Repeat with cleaner control before adding reps.';return{...previous,...base,note};
      }
      const durations=clean.map(l=>Number(l.duration)).filter(Number.isFinite),lastDuration=durations.at(-1)||ex.min;return{...previous,...base,lastDuration,nextDuration:lastDuration>=ex.max?lastDuration+(ex.increment||2):lastDuration,note:lastDuration>=ex.max?`Add ${ex.increment||2} ${ex.unit||'min'} or slightly increase intensity.`:`Repeat ${lastDuration} ${ex.unit||'min'}.`};
    }

    function rebuildProgress(){state.exerciseProgress={};const sessions=[...state.history].sort((a,b)=>new Date(a.startedAt)-new Date(b.startedAt));for(const s of sessions)for(const entry of s.exercises||[]){const ex=entryExercise(entry),logs=entry.logs||[];if(ex&&logs.length)state.exerciseProgress[entry.id]=analyzeExercise(ex,logs,state.exerciseProgress[entry.id]||{});}}

    function renderProgress() {
      const st=stats(),metric=latestBodyMetric(),trend=getWeightTrend(),weekly=weeklyReview(),weightedIds=weightedExerciseIds();let selected=state.settings.progressExerciseId;if(!weightedIds.includes(selected))selected=weightedIds[0]||'';state.settings.progressExerciseId=selected;
      const tabs=`<div class="segmented-tabs"><button class="${progressTab==='overview'?'active':''}" data-action="progress-tab" data-tab="overview">Overview</button><button class="${progressTab==='strength'?'active':''}" data-action="progress-tab" data-tab="strength">Strength</button><button class="${progressTab==='body'?'active':''}" data-action="progress-tab" data-tab="body">Body</button><button class="${progressTab==='review'?'active':''}" data-action="progress-tab" data-tab="review">Review</button></div>`;
      let content='';
      if(progressTab==='overview') content=`<div class="metric-grid-v21"><div class="metric"><div class="metric-label">Strength sessions</div><div class="metric-value">${st.strengthSessions}</div></div><div class="metric"><div class="metric-label">Recovery days</div><div class="metric-value">${st.recoverySessions}</div></div><div class="metric"><div class="metric-label">Total volume</div><div class="metric-value">${formatVolumeValue(st.totalVolume)}</div><div class="metric-sub">${displayWeightUnit()}</div></div><div class="metric"><div class="metric-label">Consistency streak</div><div class="metric-value">${st.consistencyStreak}</div><div class="metric-sub">days</div></div></div><div class="chart-card">${renderWeightChart()}</div>`;
      else if(progressTab==='strength') content=weightedIds.length?`<div class="field compact-field"><label>Exercise</label><select data-action="progress-exercise">${weightedIds.map(id=>`<option value="${esc(id)}" ${id===selected?'selected':''}>${esc(getExercise(id)?.name||id)}</option>`).join('')}</select></div><div class="chart-card">${renderStrengthChart(selected)}</div><div class="section-head"><h3>Personal records</h3></div>${renderPRs()}`:'<div class="empty">Complete a weighted workout to build strength trends and records.</div>';
      else if(progressTab==='body') content=`<div class="metric-grid-v21"><div class="metric"><div class="metric-label">Latest</div><div class="metric-value">${metric?formatWeightValue(metric.weight):'—'}</div></div><div class="metric"><div class="metric-label">7-day average</div><div class="metric-value">${Number.isFinite(trend.avg7)?`${cleanNumber(trend.avg7)} ${displayWeightUnit()}`:'—'}</div><div class="metric-sub">${esc(trend.label)}</div></div></div><div class="chart-card">${renderWeightChart()}</div><button class="btn primary block body-log-button" data-action="open-body-sheet">Log scale reading</button>${renderBodyTable()}`;
      else content=!weekly.hasData?`<div class="empty review-empty"><strong>Complete your first workout to establish a baseline.</strong><p>NEXSET will show weekly wins and adjustments after real training data is available.</p></div>`:`<div class="review-grid"><div class="metric"><div class="metric-label">Strength days</div><div class="metric-value">${weekly.lifts}/5</div></div><div class="metric"><div class="metric-label">Recovery days</div><div class="metric-value">${weekly.recovery}</div></div><div class="metric"><div class="metric-label">Working sets</div><div class="metric-value">${weekly.sets}</div></div><div class="metric"><div class="metric-label">Cardio</div><div class="metric-value">${weekly.cardio}</div><div class="metric-sub">minutes</div></div></div><div class="completion-coach"><strong>Wins</strong>${weekly.wins.map(x=>`<p>✓ ${esc(x)}</p>`).join('')}</div><div class="completion-coach"><strong>Next adjustments</strong>${weekly.adjustments.map(x=>`<p>→ ${esc(x)}</p>`).join('')}</div><button class="btn green block" data-action="share-weekly">Share weekly review</button>`;
      $('#view').innerHTML=`<div class="stack"><div class="page-title-row"><div><div class="eyebrow">Performance</div><h1>Progress</h1></div></div>${tabs}<section class="card"><div class="card-pad progress-tab-content">${content}</div></section></div>`;
    }

    function weightedExerciseIds(){const ids=[];for(const session of state.history)for(const entry of session.exercises||[]){const ex=entryExercise(entry);if(ex?.type==='weighted'&&strengthPoints(entry.id).length)ids.push(entry.id);}return [...new Set(ids)];}

    function strengthPoints(id){const ex=getExercise(id),points=[];if(!ex)return points;for(const s of [...state.history].sort((a,b)=>new Date(a.startedAt)-new Date(b.startedAt))){const entry=(s.exercises||[]).find(e=>e.id===id);if(!entry)continue;let best=0;for(const log of workingLogs(entry.logs||[])){const w=Number(log.weight),r=Number(log.reps);if(Number.isFinite(w)&&Number.isFinite(r))best=Math.max(best,w*(1+r/30));}if(best)points.push({date:s.startedAt,value:Math.round(fromStorageWeight(best)*10)/10});}return points;}

    function weightPoints(){return [...state.bodyMetrics].sort((a,b)=>new Date(a.date)-new Date(b.date)).filter(m=>Number.isFinite(Number(m.weight))).map(m=>({date:m.date,value:roundedDisplayWeight(m.weight)}));}

    function renderWeightChart(){const pts=weightPoints();return renderLineChart(pts,displayWeightUnit(),'body');}

    function renderStrengthChart(id){return renderLineChart(strengthPoints(id),`e1RM ${displayWeightUnit()}`,'strength');}

    function renderLineChart(points,unit,kind='body'){if(points.length<2){const one=points.length===1,isStrength=kind==='strength',title=one?'One data point saved':isStrength?'Build your strength trend':'Build your body trend',copy=one?'Add one more matching entry to unlock the chart.':isStrength?'Complete this exercise in two workouts to compare estimated strength.':'Log two body-weight readings to reveal your trend.',action=isStrength?'<button class="btn small" data-view="plan">Open workouts</button>':'<button class="btn small" data-action="open-body-sheet">Log body weight</button>';return`<div class="trend-empty"><span class="trend-empty-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18l5-5 4 3 7-9"/><path d="M15 7h5v5"/></svg></span><strong>${title}</strong><p>${copy}</p>${action}</div>`;}const w=600,h=180,pad=18,vals=points.map(p=>p.value),min=Math.min(...vals),max=Math.max(...vals),range=Math.max(1,max-min),coords=points.map((p,i)=>({x:pad+(i/(points.length-1))*(w-pad*2),y:h-pad-((p.value-min)/range)*(h-pad*2),...p})),path=coords.map((p,i)=>`${i?'L':'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');return`<div class="chart-heading"><strong>${cleanNumber(points.at(-1).value)} ${esc(unit)}</strong><span>${fmtDate(points[0].date)} → ${fmtDate(points.at(-1).date)}</span></div><div class="chart-wrap"><svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0D7DFF" stop-opacity=".35"/><stop offset="1" stop-color="#0D7DFF" stop-opacity="0"/></linearGradient></defs><path d="${path} L ${coords.at(-1).x} ${h-pad} L ${coords[0].x} ${h-pad} Z" fill="url(#area)"/><path d="${path}" fill="none" stroke="#49B4FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${coords.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="5" fill="#f8fafc"/>`).join('')}</svg></div>`;}

    function getWeightTrend(){const pts=weightPoints(),now=Date.now();const avgFor=days=>{const cut=now-days*86400000,vals=pts.filter(p=>new Date(p.date).getTime()>=cut).map(p=>p.value);return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null;};const avg7=avgFor(7);let label='Collecting trend';if(pts.length>=4){const recent=pts.slice(-3).reduce((a,b)=>a+b.value,0)/Math.min(3,pts.length),olderPts=pts.slice(0,Math.max(1,pts.length-3)).slice(-3),older=olderPts.reduce((a,b)=>a+b.value,0)/Math.max(1,olderPts.length),diff=recent-older;label=Math.abs(diff)<.25?'Stable trend':diff<0?`Trending down ${cleanNumber(Math.abs(diff))} ${displayWeightUnit()}`:`Trending up ${cleanNumber(diff)} ${displayWeightUnit()}`;}return{avg7,label};}

    function weeklyReview(){
      const end=new Date(),start=new Date();start.setDate(end.getDate()-6);start.setHours(0,0,0,0);const sessions=state.history.filter(s=>new Date(s.startedAt)>=start),lifts=sessions.filter(s=>s.type!=='rest'),recovery=sessions.filter(s=>s.type==='rest').length,sets=lifts.reduce((sum,s)=>sum+sessionWorkingSets(s),0),cardio=Math.round(sessions.reduce((sum,s)=>sum+sessionCardioMinutes(s),0)*100)/100,all=lifts.flatMap(s=>(s.exercises||[]).flatMap(e=>workingLogs(e.logs||[]))),rated=all.filter(l=>l.feel),hard=rated.filter(l=>l.feel==='hard').length,hardPct=rated.length?Math.round(hard/rated.length*100):0,ready=Object.values(state.exerciseProgress).filter(p=>/Increase|Try/.test(p.note||'')).length;
      if(!sessions.length)return{title:`${fmtDate(start)} – ${fmtDate(end)}`,hasData:false,lifts:0,recovery:0,sets:0,cardio:0,hardPct:0,wins:[],adjustments:['Complete your first workout to establish a baseline.']};
      const wins=[];if(lifts.length)wins.push(`${lifts.length} strength session${lifts.length===1?'':'s'} completed with ${sets} working sets.`);if(recovery)wins.push(`${recovery} recovery day${recovery===1?'':'s'} logged.`);if(cardio)wins.push(`${cardio} cardio minutes logged.`);if(ready)wins.push(`${ready} exercise${ready===1?' is':'s are'} ready for progression.`);if(!wins.length)wins.push('Your first program day is recorded.');
      const adjustments=[];if(lifts.length<5)adjustments.push(`Complete up to ${5-lifts.length} remaining strength day${5-lifts.length===1?'':'s'} without cramming missed sessions together.`);if(cardio<100)adjustments.push(`Build cardio gradually; ${cardio} minutes are logged in the last 7 days.`);if(rated.length){if(hardPct>35)adjustments.push(`${hardPct}% of rated sets were hard. Keep most working sets “just right” and save grinders for occasional final sets.`);else adjustments.push('Effort balance looks controlled. Keep most sets 1–2 clean reps from failure.');}else adjustments.push('Rate your working sets so coaching can distinguish productive effort from excessive fatigue.');if(state.bodyMetrics.length<2)adjustments.push('Log morning weight several times per week to build a dependable trend.');
      return{title:`${fmtDate(start)} – ${fmtDate(end)}`,hasData:true,lifts:lifts.length,recovery,sets,cardio,hardPct,wins,adjustments};
    }

    function openBodySheet(id=null){
      closeBodySheet();bodyEditorId=id||null;const metric=bodyEditorId?state.bodyMetrics.find(m=>m.id===bodyEditorId):latestBodyMetric();
      document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="bodySheet"><section class="bottom-sheet body-quick-sheet" role="dialog" aria-modal="true" aria-label="${bodyEditorId?'Edit':'Log'} body metrics"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">Daily check-in</span><h2>${bodyEditorId?'Edit':'Log'} body metrics</h2><p class="muted" style="margin:5px 0 0;font-size:12px">Weight is required. Everything else is optional.</p></div><button data-action="close-body-sheet" aria-label="Close">×</button></div>${renderBodyForm(metric,Boolean(bodyEditorId))}</section></div>`);
      setTimeout(()=>document.querySelector('#bodySheet [data-body="weight"]')?.focus(),120);
    }

    function closeBodySheet(){document.querySelector('#bodySheet')?.remove();bodyEditorId=null;}

    function renderBodyForm(prefill,editing=false){
      const weight=Number.isFinite(Number(prefill?.weight))?roundedDisplayWeight(prefill.weight):'',muscle=Number.isFinite(Number(prefill?.muscleMass))?roundedDisplayWeight(prefill.muscleMass):'';
      const deleteButton=editing&&bodyEditorId?`<button class="btn danger block" data-action="delete-body" data-id="${esc(bodyEditorId)}">Delete this reading</button>`:'';
      return`<div class="form-grid"><div class="mini-grid"><div class="field"><label>Body weight (${displayWeightUnit()})</label><input data-body="weight" inputmode="decimal" placeholder="required" value="${esc(weight)}"></div><div class="field"><label>Body fat %</label><input data-body="bodyFat" inputmode="decimal" placeholder="optional" value="${esc(prefill?.bodyFat??'')}"></div><div class="field"><label>Waist</label><input data-body="waist" inputmode="decimal" placeholder="optional" value="${esc(prefill?.waist??'')}"></div><div class="field"><label>Muscle mass (${displayWeightUnit()})</label><input data-body="muscleMass" inputmode="decimal" placeholder="optional" value="${esc(muscle)}"></div><div class="field"><label>Skeletal muscle %</label><input data-body="skeletalMuscle" inputmode="decimal" placeholder="optional" value="${esc(prefill?.skeletalMuscle??'')}"></div><div class="field"><label>Visceral fat</label><input data-body="visceralFat" inputmode="decimal" placeholder="optional" value="${esc(prefill?.visceralFat??'')}"></div></div><div class="field"><label>Note</label><input data-body="note" placeholder="optional" value="${esc(prefill?.note??'')}"></div><button class="btn primary block" data-action="save-body">${editing?'Save changes':'Save scale reading'}</button>${deleteButton}</div>`;
    }

    function renderBodyTable(){
      const rows=[...state.bodyMetrics].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,8);
      if(!rows.length)return'<section class="body-readings-card body-readings-empty"><div><strong>No readings yet</strong><p>Your recent weigh-ins will appear here and can be corrected at any time.</p></div></section>';
      return`<section class="body-readings-card"><div class="body-readings-head"><div><span class="section-kicker">History</span><h3>Recent readings</h3></div><small>Tap to edit</small></div><div class="body-reading-list">${rows.map(m=>`<button class="body-reading-row" data-action="edit-body" data-id="${esc(m.id)}" aria-label="Edit body reading from ${esc(fmtDate(m.date))}"><span class="body-reading-date">${esc(fmtDate(m.date))}</span><span class="body-reading-value"><strong>${esc(formatWeightValue(m.weight))}</strong>${m.bodyFat?`<small>${esc(m.bodyFat)}% body fat</small>`:'<small>Weight only</small>'}</span><span class="body-reading-chevron">›</span></button>`).join('')}</div></section>`;
    }

    function saveBody(){
      const sheet=document.querySelector('#bodySheet'),root=sheet||document,field=name=>root.querySelector(`[data-body="${name}"]`),rawWeight=String(field('weight')?.value??'').trim(),shownWeight=Number(rawWeight);
      if(!rawWeight||!Number.isFinite(shownWeight)||shownWeight<=0){showToast('Enter body weight.');return;}
      const value=name=>{const raw=String(field(name)?.value??'').trim();if(!raw)return null;const n=Number(raw);return Number.isFinite(n)?n:null;};
      const existing=bodyEditorId?state.bodyMetrics.find(m=>m.id===bodyEditorId):null,record={id:existing?.id||(crypto.randomUUID?crypto.randomUUID():String(Date.now())),date:existing?.date||new Date().toISOString(),weight:toStorageWeight(shownWeight),bodyFat:value('bodyFat'),waist:value('waist'),muscleMass:(()=>{const n=value('muscleMass');return n===null?null:toStorageWeight(n);})(),skeletalMuscle:value('skeletalMuscle'),visceralFat:value('visceralFat'),note:field('note')?.value?.trim()||''};
      if(existing)Object.assign(existing,record);else state.bodyMetrics.push(record);saveState({reason:existing?'body-edit':'body-add'});const edited=Boolean(existing);
      if(sheet){closeBodySheet();if(currentView==='home')renderHome();else renderProgress();}else renderProgress();
      showToast(edited?'Body reading updated.':'Today’s body reading saved.');
    }

    function deleteBodyMetric(id){
      const index=state.bodyMetrics.findIndex(m=>m.id===id);if(index<0)return;
      const removed=deepClone(state.bodyMetrics[index]),wasSheetOpen=Boolean(document.querySelector('#bodySheet'));
      state.bodyMetrics.splice(index,1);if(wasSheetOpen)closeBodySheet();saveState({reason:'body-delete'});
      const redraw=()=>currentView==='home'?renderHome():renderProgress();redraw();
      showToast('Body reading deleted.',{label:'Undo',run:()=>{state.bodyMetrics.splice(Math.min(index,state.bodyMetrics.length),0,removed);saveState({reason:'undo-body-delete'});redraw();showToast('Body reading restored.');}});
    }

    function renderPRs(){const items=[];for(const id of weightedExerciseIds()){const ex=getExercise(id),best=bestSet(id);if(best)items.push({ex,best});}items.sort((a,b)=>b.best.score-a.best.score);if(!items.length)return'<div class="empty">Complete workouts to build personal records.</div>';return`<div class="stack" style="gap:10px">${items.slice(0,12).map(({ex,best})=>`<div class="soft-card" style="display:flex;justify-content:space-between;gap:12px;align-items:center"><div><strong>${esc(ex.name)}</strong><div class="muted" style="font-size:12px;margin-top:3px">${fmtDate(best.date)}</div></div><span class="target-pill">🏆 ${esc(formatLogShort(ex,best.log))}</span></div>`).join('')}</div>`;}


    function inferWorkoutFocus(exercises=[]) {
      const groups=new Set(exercises.map(movementGroup)),lower=['squat','leg_press','knee_extension','knee_flexion','hinge','hip_extension','hip_abduction','calves'],push=['horizontal_push','incline_push','vertical_push','chest_isolation','lateral_raise','triceps'],pull=['vertical_pull','horizontal_pull','rear_delts','biceps'];
      const has=list=>list.some(item=>groups.has(item)),hasLower=has(lower),hasPush=has(push),hasPull=has(pull),hasCardio=groups.has('cardio')||groups.has('mobility');
      if(hasLower&&!hasPush&&!hasPull)return 'Lower body and posterior chain';if(hasPush&&!hasPull&&!hasLower)return 'Chest, shoulders, and triceps';if(hasPull&&!hasPush&&!hasLower)return 'Back, rear delts, and biceps';if(hasPush&&hasPull&&!hasLower)return 'Upper body';if(hasCardio&&!hasPush&&!hasPull&&!hasLower)return 'Cardio and recovery';return 'Full-body custom session';
    }
    function closeQuickBuilder(){ $('#quickBuilderOverlay')?.remove(); quickBuilder=null; }
    function openQuickBuilder(templateId=''){
      if(active){showToast('Finish or cancel the current workout before starting another.');return;}
      const template=state.quickTemplates.find(item=>item.id===templateId);quickBuilder={name:template?.name||'Quick Workout',selectedIds:[...(template?.exerciseIds||[])],query:''};renderQuickBuilder();
    }
    function syncQuickBuilderInputs(){if(!quickBuilder)return;const name=$('[data-quick-name]')?.value;if(typeof name==='string')quickBuilder.name=name.slice(0,60);const query=$('[data-quick-search]')?.value;if(typeof query==='string')quickBuilder.query=query.slice(0,80);}
    function renderQuickBuilder(){
      $('#quickBuilderOverlay')?.remove();if(!quickBuilder)return;const selected=quickBuilder.selectedIds.map(id=>getExercise(id)).filter(Boolean),query=String(quickBuilder.query||'').toLowerCase(),available=exerciseLibrary().filter(ex=>!quickBuilder.selectedIds.includes(ex.id)&&(!query||`${ex.name} ${ex.equipment} ${movementGroup(ex)}`.toLowerCase().includes(query))).slice(0,60);
      const templates=state.quickTemplates.slice().reverse();
      document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="quickBuilderOverlay"><section class="bottom-sheet builder-sheet" role="dialog" aria-modal="true" aria-label="Quick workout builder"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">Flexible workout</span><h2>Quick Workout</h2></div><button data-action="close-quick-builder">×</button></div>
      ${templates.length?`<div class="builder-section"><div class="builder-section-head"><strong>Saved templates</strong><small>${templates.length}</small></div><div class="template-strip">${templates.map(t=>`<div class="template-card"><button data-action="load-quick-template" data-id="${esc(t.id)}"><b>${esc(t.name)}</b><small>${t.exerciseIds.length} exercises</small></button><button data-action="delete-quick-template" data-id="${esc(t.id)}" aria-label="Delete template">×</button></div>`).join('')}</div></div>`:''}
      <div class="field"><label>Workout name</label><input data-quick-name value="${esc(quickBuilder.name)}" placeholder="Quick Workout"></div>
      <div class="builder-section"><div class="builder-section-head"><strong>Selected exercises</strong><small>${selected.length}</small></div><div class="builder-selected-list">${selected.length?selected.map((ex,index)=>`<div class="builder-selected-row"><span>${index+1}</span><div><b>${esc(ex.name)}</b><small>${esc(targetLabel(ex))}</small></div><div><button data-action="move-quick-exercise" data-index="${index}" data-delta="-1" ${index?'':'disabled'}>↑</button><button data-action="move-quick-exercise" data-index="${index}" data-delta="1" ${index<selected.length-1?'':'disabled'}>↓</button><button data-action="remove-quick-exercise" data-index="${index}">×</button></div></div>`).join(''):'<div class="builder-empty">Add at least one exercise below.</div>'}</div></div>
      <div class="field"><label>Add exercises</label><input data-quick-search value="${esc(quickBuilder.query)}" placeholder="Search by exercise or equipment…"></div><div class="exercise-library-list compact-library">${available.map(ex=>`<button data-action="add-quick-exercise" data-id="${esc(ex.id)}"><span><b>${esc(ex.name)}</b><small>${esc(ex.equipment||'Gym floor')} · ${esc(targetLabel(ex))}</small></span><em>＋</em></button>`).join('')}</div>
      <div class="builder-footer"><button class="btn" data-action="save-quick-template" ${selected.length?'':'disabled'}>Save template</button><button class="btn primary" data-action="start-quick-workout" ${selected.length?'':'disabled'}>Start workout</button></div></section></div>`);
    }
    function addQuickExercise(id){syncQuickBuilderInputs();if(!quickBuilder||quickBuilder.selectedIds.includes(id))return;quickBuilder.selectedIds.push(id);renderQuickBuilder();}
    function removeQuickExercise(index){syncQuickBuilderInputs();quickBuilder?.selectedIds.splice(Number(index),1);renderQuickBuilder();}
    function moveQuickExercise(index,delta){syncQuickBuilderInputs();if(!quickBuilder)return;const from=Number(index),to=clamp(from+Number(delta),0,quickBuilder.selectedIds.length-1);if(from===to)return;const [id]=quickBuilder.selectedIds.splice(from,1);quickBuilder.selectedIds.splice(to,0,id);renderQuickBuilder();}
    function saveQuickTemplate(){syncQuickBuilderInputs();if(!quickBuilder?.selectedIds.length)return;const name=(quickBuilder.name||'Quick Workout').trim()||'Quick Workout';state.quickTemplates.push({id:crypto.randomUUID?crypto.randomUUID():`template-${Date.now()}`,name,exerciseIds:[...quickBuilder.selectedIds],createdAt:new Date().toISOString()});state.quickTemplates=state.quickTemplates.slice(-50);saveState({reason:'quick-template-save'});renderQuickBuilder();showToast('Workout template saved.');}
    function deleteQuickTemplate(id){const index=state.quickTemplates.findIndex(t=>t.id===id);if(index<0)return;const [removed]=state.quickTemplates.splice(index,1);saveState({reason:'quick-template-delete'});renderQuickBuilder();showToast('Template deleted.',{label:'Undo',run:()=>{state.quickTemplates.splice(index,0,removed);saveState({reason:'quick-template-restore'});if(quickBuilder)renderQuickBuilder();showToast('Template restored.');}});}
    function startQuickWorkout(){syncQuickBuilderInputs();if(!quickBuilder?.selectedIds.length)return;const exercises=quickBuilder.selectedIds.map(id=>getExercise(id)).filter(Boolean);if(!exercises.length)return;const title=(quickBuilder.name||'Quick Workout').trim()||'Quick Workout';active={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),schemaVersion:DATA_SCHEMA_VERSION,storageWeightUnit:STORAGE_WEIGHT_UNIT,isQuick:true,dayIndex:-1,day:0,title,type:'quick',focus:inferWorkoutFocus(exercises),startedAt:new Date().toISOString(),sessionNote:'',restTimer:null,currentExerciseIndex:0,exercises:exercises.map(ex=>makeActiveEntry(ex,null))};closeQuickBuilder();saveActive({reason:'quick-workout-start'});currentView='workout';render();showToast('Quick Workout started.');}

    function closeProgramEditor(){ $('#programEditorOverlay')?.remove(); programEditor=null; }
    function syncProgramEditorFields(){if(!programEditor||programEditor.mode!=='overview')return;for(const key of ['title','focus','warmup','note']){const value=$(`[data-program-field="${key}"]`)?.value;if(typeof value==='string')programEditor.draft[key]=value.slice(0,key==='title'?60:500);}}
    function openProgramEditor(index=state.settings.currentDayIndex){const plan=getPlan(),dayIndex=clamp(Number(index)||0,0,plan.length-1);programEditor={dayIndex,draft:deepClone(plan[dayIndex]),mode:'overview',search:'',editIndex:null};renderProgramEditor();}
    function renderProgramEditor(){
      $('#programEditorOverlay')?.remove();if(!programEditor)return;const {draft,mode}=programEditor;
      if(mode==='library'){const query=String(programEditor.search||'').toLowerCase(),used=new Set(draft.exercises.map(ex=>ex.id)),items=exerciseLibrary().filter(ex=>!used.has(ex.id)&&(!query||`${ex.name} ${ex.equipment} ${movementGroup(ex)}`.toLowerCase().includes(query))).slice(0,60);document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="programEditorOverlay"><section class="bottom-sheet program-editor-sheet"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">${esc(draft.title)}</span><h2>Add exercise</h2></div><button data-action="program-editor-back">←</button></div><div class="field"><label>Search</label><input data-program-search value="${esc(programEditor.search||'')}" placeholder="Exercise or equipment…"></div><div class="exercise-library-list">${items.map(ex=>`<button data-action="program-add-exercise" data-id="${esc(ex.id)}"><span><b>${esc(ex.name)}</b><small>${esc(ex.equipment||'')} · ${esc(targetLabel(ex))}</small></span><em>＋</em></button>`).join('')}</div></section></div>`);return;}
      if(mode==='exercise'){const index=programEditor.editIndex,ex=draft.exercises[index];document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="programEditorOverlay"><section class="bottom-sheet program-editor-sheet"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">Edit target</span><h2>${esc(ex.name)}</h2></div><button data-action="program-editor-back">←</button></div><div class="form-grid"><div class="mini-grid"><div class="field"><label>Sets</label><input data-program-exercise="sets" inputmode="numeric" value="${esc(ex.sets)}"></div><div class="field"><label>${ex.type==='cardio'||ex.type==='timed'?'Minimum':'Minimum reps'}</label><input data-program-exercise="min" inputmode="decimal" value="${esc(ex.min)}"></div><div class="field"><label>${ex.type==='cardio'||ex.type==='timed'?'Maximum':'Maximum reps'}</label><input data-program-exercise="max" inputmode="decimal" value="${esc(ex.max)}"></div><div class="field"><label>${ex.type==='weighted'?`Weight step (${displayWeightUnit()})`:'Duration step'}</label><input data-program-exercise="increment" inputmode="decimal" value="${esc(ex.type==='weighted'?cleanNumber(fromStorageWeight(ex.increment)):ex.increment)}"></div></div><div class="field"><label>Rest seconds</label><input data-program-exercise="restSeconds" inputmode="numeric" value="${esc(Number.isFinite(Number(ex.restSeconds))?ex.restSeconds:state.settings.restSeconds)}"></div><button class="btn primary block" data-action="save-program-exercise">Save exercise target</button></div></section></div>`);return;}
      document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="programEditorOverlay"><section class="bottom-sheet program-editor-sheet"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">Routine editor</span><h2>Day ${draft.day} · ${esc(draft.title)}</h2></div><button data-action="close-program-editor">×</button></div><div class="form-grid program-fields"><div class="field"><label>Workout name</label><input data-program-field="title" value="${esc(draft.title)}"></div><div class="field"><label>Focus</label><input data-program-field="focus" value="${esc(draft.focus)}"></div><div class="field"><label>Warm-up</label><textarea data-program-field="warmup">${esc(draft.warmup)}</textarea></div><div class="field"><label>Workout note</label><textarea data-program-field="note">${esc(draft.note)}</textarea></div></div><div class="builder-section"><div class="builder-section-head"><strong>Exercises</strong><small>${draft.exercises.length}</small></div><div class="program-editor-rows">${draft.exercises.map((ex,index)=>`<div class="program-editor-row"><span>${index+1}</span><button data-action="edit-program-exercise" data-index="${index}"><b>${esc(ex.name)}</b><small>${esc(targetLabel(ex))} · ${esc(ex.equipment||'')}</small></button><div><button data-action="move-program-exercise" data-index="${index}" data-delta="-1" ${index?'':'disabled'}>↑</button><button data-action="move-program-exercise" data-index="${index}" data-delta="1" ${index<draft.exercises.length-1?'':'disabled'}>↓</button><button data-action="remove-program-exercise" data-index="${index}">×</button></div></div>`).join('')}</div><button class="btn block" data-action="program-add-library">＋ Add exercise</button></div><div class="builder-footer vertical"><button class="btn subtle" data-action="reset-program-day">Restore original day</button><button class="btn primary" data-action="save-program-day">Save workout</button></div></section></div>`);
    }
    function moveProgramExercise(index,delta){syncProgramEditorFields();const list=programEditor?.draft?.exercises;if(!list)return;const from=Number(index),to=clamp(from+Number(delta),0,list.length-1);if(from===to)return;const [ex]=list.splice(from,1);list.splice(to,0,ex);renderProgramEditor();}
    function removeProgramExercise(index){syncProgramEditorFields();if(!programEditor)return;if(programEditor.draft.exercises.length<=1){showToast('A workout needs at least one exercise.');return;}programEditor.draft.exercises.splice(Number(index),1);renderProgramEditor();}
    function addProgramExercise(id){const ex=getExercise(id);if(!programEditor||!ex)return;programEditor.draft.exercises.push(deepClone(ex));programEditor.mode='overview';renderProgramEditor();}
    function saveProgramExercise(){if(!programEditor||programEditor.mode!=='exercise')return;const ex=programEditor.draft.exercises[programEditor.editIndex];const read=key=>Number($(`[data-program-exercise="${key}"]`)?.value);const sets=read('sets'),min=read('min'),max=read('max'),increment=read('increment'),rest=read('restSeconds');if(!(sets>=1&&min>0&&max>=min)){showToast('Check the set and target values.');return;}ex.sets=clamp(Math.trunc(sets),1,12);ex.min=min;ex.max=max;ex.increment=ex.type==='weighted'?toStorageWeight(Math.max(0,increment)):Math.max(0,increment);ex.restSeconds=clamp(Math.trunc(Number.isFinite(rest)?rest:state.settings.restSeconds),0,900);programEditor.mode='overview';renderProgramEditor();}
    function saveProgramDay(){syncProgramEditorFields();if(!programEditor?.draft?.exercises?.length)return;const plan=deepClone(getPlan());plan[programEditor.dayIndex]=normalizeProgramPlan([programEditor.draft])[0];plan.forEach((day,index)=>day.day=index+1);state.programPlan=normalizeProgramPlan(plan);saveState({reason:'program-edit'});const title=state.programPlan[programEditor.dayIndex].title;closeProgramEditor();renderPlan();showToast(`${title} updated.`);}
    function resetProgramDay(){if(!programEditor)return;if(!confirm('Restore this day to the original NEXSET routine?'))return;programEditor.draft=deepClone(PLAN[programEditor.dayIndex]||PLAN[0]);programEditor.draft.day=programEditor.dayIndex+1;renderProgramEditor();}

    function programWeekNumber(){const scheduledLifts=state.history.filter(session=>session.type!=='rest'&&Number(session.dayIndex)>=0).length;return Math.max(1,Math.min(6,Math.floor(scheduledLifts/5)+1));}
    function sessionExerciseCount(session){return(session?.exercises||[]).filter(entry=>(entry.logs||[]).length).length;}
    function renderProgramRecentCard(session){return`<button class="program-history-card" data-action="open-history"><span class="history-mark">${renderMuscleFigure(resolveSessionDay(session),true)}</span><span class="history-card-copy"><b>${esc(session.title||'Workout')}</b><small>${fmtDate(session.startedAt)} · ${formatDuration(session.durationMs)}</small><span class="recent-metrics"><i>Volume<strong>${formatVolumeValue(sessionVolume(session))} ${displayWeightUnit()}</strong></i><i>Exercises<strong>${sessionExerciseCount(session)}</strong></i><i>Sets<strong>${sessionWorkingSets(session)}</strong></i></span></span><em>✓</em></button>`;}

    function renderPlan(){
      const plan=getPlan(),selected=getDay(),cutoff=new Date();cutoff.setDate(cutoff.getDate()-6);cutoff.setHours(0,0,0,0);
      const completed=new Set(state.history.filter(s=>new Date(s.startedAt)>=cutoff&&Number(s.dayIndex)>=0).map(s=>Number(s.dayIndex))),sessions=[...state.history].sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt)).slice(0,2),weekdays=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      $('#view').innerHTML=`<div class="stack program-screen">
        <div class="program-segment"><button class="active">Program</button><button data-action="open-history">History</button></div>
        <div class="program-heading"><div><span>${plan.length}-Day Split <i class="program-info">i</i></span></div><strong>Week ${programWeekNumber()} of 6</strong></div>
        <div class="program-tools"><button class="btn primary" data-action="open-quick-builder">＋ Quick Workout</button><button class="btn" data-action="open-program-editor" data-index="${state.settings.currentDayIndex}">Edit selected day</button></div>
        ${state.quickTemplates.length?`<section class="saved-template-section"><div class="program-recent-head"><span>Saved templates</span><small>${state.quickTemplates.length}</small></div><div class="saved-template-list">${state.quickTemplates.slice().reverse().slice(0,4).map(template=>`<button data-action="load-quick-template" data-id="${esc(template.id)}"><span><b>${esc(template.name)}</b><small>${template.exerciseIds.length} exercises</small></span><em>Start ›</em></button>`).join('')}</div></section>`:''}
        <section class="program-list">${plan.map((day,i)=>`<div class="program-row-wrap"><button class="program-row ${i===state.settings.currentDayIndex?'selected':''} ${completed.has(i)?'completed':''}" data-action="select-plan-day" data-index="${i}"><span class="program-weekday">${weekdays[i]||`D${i+1}`}</span><span class="program-muscle">${renderMuscleFigure(day,true)}</span><span class="program-copy"><b>${esc(day.title)}</b><small>${esc(day.focus)}</small></span><span class="program-state">${completed.has(i)?'✓':i===state.settings.currentDayIndex?'›':'○'}</span></button><button class="program-edit-button" data-action="open-program-editor" data-index="${i}" aria-label="Edit ${esc(day.title)}">✎</button></div>`).join('')}</section>
        <div class="program-recent-head"><span>Recent workouts</span><button data-action="open-history">View all</button></div>
        <section class="program-recent-list">${sessions.length?sessions.map(renderProgramRecentCard).join(''):`<button class="program-empty-card" data-view="home"><span class="history-mark">${renderMuscleFigure(selected,true)}</span><span><b>No completed workouts yet</b><small>Start ${esc(selected.title)} from Home and it will appear here.</small></span><em>›</em></button>`}</section>
      </div>`;
    }

    function formatStatusTime(value) {
      if(!value) return 'Not yet';
      const date = new Date(value); if(!Number.isFinite(date.getTime())) return 'Unknown';
      return date.toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
    }

    function renderBackupPanel() {
      const recovery = readRecoverySnapshot();
      const swStatus = navigator.serviceWorker?.controller ? 'Active' : 'Browser mode';
      return `<div class="stack"><button class="back-link" data-action="more-back">← Profile</button><section class="card"><div class="card-pad"><div class="eyebrow">Your data</div><h1 style="margin-top:8px">Backup & restore</h1><p class="muted">NEXSET now keeps a local recovery copy as you train. Export a file before changing phones or clearing Safari data.</p><div class="data-health-grid"><div class="data-health-row"><span class="data-health-icon">✓</span><span class="data-health-copy"><b>Last saved</b><small>Workout history and settings</small></span><span class="data-health-value">${esc(formatStatusTime(meta.lastSavedAt))}</span></div><div class="data-health-row"><span class="data-health-icon">⇩</span><span class="data-health-copy"><b>Last exported backup</b><small>Downloadable JSON file</small></span><span class="data-health-value">${esc(formatStatusTime(meta.lastBackupAt))}</span></div><div class="data-health-row"><span class="data-health-icon">↺</span><span class="data-health-copy"><b>Local recovery copy</b><small>${recovery?'Available on this device':'Created after the next save'}</small></span><span class="data-health-value">${esc(formatStatusTime(recovery?.savedAt || meta.lastRecoveryAt))}</span></div><div class="data-health-row"><span class="data-health-icon">N</span><span class="data-health-copy"><b>NEXSET ${APP_VERSION_LABEL}</b><small>Service worker</small></span><span class="data-health-value">${esc(swStatus)}</span></div></div><div class="button-row"><button class="btn primary" data-action="export-backup">Export backup</button><button class="btn" data-action="import-backup">Import backup</button></div><div class="backup-action-stack"><button class="btn block" data-action="restore-recovery" ${recovery?'':'disabled'}>Restore local recovery copy</button><div class="backup-secondary-grid"><button class="btn" data-action="check-update">Check for update</button><button class="btn" data-action="download-diagnostics">Download diagnostics</button></div><button class="btn block" data-action="refresh-cache">Refresh app cache</button><button class="btn danger block" data-action="reset-app">Reset app data</button></div><p class="data-note">Imports are validated before replacing your data. NEXSET also creates a recovery copy immediately before an import or reset-sensitive operation.</p></div></section></div>`;
    }

    function renderMore(){
      const sessions=[...state.history].sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt));
      const profileName=state.settings.profileName||'Athlete';
      if(moreSection==='history'){
        $('#view').innerHTML=`<div class="stack history-screen"><div class="program-segment"><button data-view="plan">Program</button><button class="active">History</button></div><div class="history-page-head"><div><span>Workout history</span><small>${sessions.length} saved session${sessions.length===1?'':'s'}</small></div></div><div class="history-list">${sessions.length?sessions.map(renderHistoryCard).join(''):`<button class="program-empty-card history-empty" data-view="home"><span class="history-mark">${renderMuscleFigure(getDay(),true)}</span><span><b>Your history starts here</b><small>Finish your first workout to build your training log.</small></span><em>›</em></button>`}</div></div>`;return;
      }
      if(moreSection==='coach'){ $('#view').innerHTML=`<div class="stack"><button class="back-link" data-action="more-back">← Profile</button><section class="card"><div class="card-pad"><div class="eyebrow">Coach</div><h1 style="margin-top:8px">Check-in</h1><p class="muted">Share your workouts, body trends, and next-weight recommendations with ChatGPT.</p><button class="btn green block" data-action="share-coach">Share full check-in</button><button class="btn block" style="margin-top:10px" data-action="share-weekly">Share weekly review</button></div></section></div>`;return;}
      if(moreSection==='settings'){ $('#view').innerHTML=`<div class="stack"><button class="back-link" data-action="more-back">← Profile</button><div class="page-title-row"><div><div class="eyebrow">Preferences</div><h1>Settings</h1></div></div>${renderSettings()}</div>`;return;}
      if(moreSection==='backup'){ $('#view').innerHTML=renderBackupPanel();return;}
      $('#view').innerHTML=`<div class="stack profile-screen"><section class="profile-hero"><span class="profile-avatar"><img src="nexset-mark.svg" alt=""></span><span><small>NEXSET athlete</small><h1>${esc(profileName)}</h1><p>Progress Starts With Your Next Set.</p></span></section><section class="card profile-menu-card"><div class="more-menu"><button data-view="progress"><span class="menu-icon">▥</span><div><strong>Progress</strong><small>Strength, volume, records, and body trends</small></div><b>›</b></button><button data-action="more-section" data-section="coach"><span class="menu-icon coach">N</span><div><strong>Coach check-in</strong><small>Share progress and recommendations</small></div><b>›</b></button><button data-action="more-section" data-section="settings"><span class="menu-icon">⚙</span><div><strong>Settings</strong><small>Rest timer, units, and app links</small></div><b>›</b></button><button data-action="more-section" data-section="backup"><span class="menu-icon">⇩</span><div><strong>Backup & restore</strong><small>Protect your training history</small></div><b>›</b></button></div></section><section class="card"><div class="card-pad"><div class="eyebrow">Quick launch</div><div style="margin-top:12px">${renderQuickLaunch()}</div></div></section><div class="about-nexset"><img src="nexset-mark.svg" alt=""><span>NEXSET ${APP_VERSION_LABEL}</span><small>Progress Starts With Your Next Set.</small></div></div>`;
    }

    function renderHistoryCard(s){
      const sets=sessionWorkingSets(s),volume=sessionVolume(s),cardio=sessionCardioMinutes(s),sessionDay=resolveSessionDay(s),status=s.type==='rest'?'Rest':s.prs?.length?`${s.prs.length} PR`:'Done';
      return`<details class="history-card"><summary><div class="history-top"><span class="history-muscle">${renderMuscleFigure(sessionDay,true)}</span><div class="history-main"><strong>${esc(s.title||'Workout')}</strong><small>${fmtDate(s.startedAt)} · ${formatDuration(s.durationMs)}</small><span class="history-metrics"><i>${sets} sets</i><i>${formatVolumeValue(volume)} ${displayWeightUnit()}</i>${cardio?`<i>${cardio} min</i>`:''}</span></div><span class="history-status ${s.type==='rest'?'rest':''}">${s.type==='rest'?'☁':'✓'}<small>${status}</small></span></div></summary><div class="history-body">${s.sessionNote?`<div class="soft-card"><strong>Session note</strong><p class="muted" style="margin:6px 0 0">${esc(s.sessionNote)}</p></div>`:''}${(s.exercises||[]).map((entry,exerciseIndex)=>{const ex=entryExercise(entry);if(!ex||(entry.logs||[]).length===0)return'';return`<div class="history-ex"><strong>${esc(ex.name)}</strong><div class="set-inline">${(entry.logs||[]).map((log,setIndex)=>`<button class="set-chip ${log.warmup?'wu':''}" data-action="edit-history-set" data-session-id="${esc(s.id)}" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}">${esc(formatLogShort(ex,log))} ${ex.type==='weighted'||ex.type==='bodyweight'?feelEmoji(log.feel):''}</button>`).join('')}</div>${entry.notes?`<div class="muted" style="font-size:12px;margin-top:7px">Note: ${esc(entry.notes)}</div>`:''}</div>`;}).join('')}<button class="btn danger block" data-action="delete-session" data-id="${esc(s.id)}">Delete session</button></div></details>`;
    }

    function renderSettings(){return`<div class="stack" style="gap:10px"><details class="setting" open><summary>Training preferences <span>⌄</span></summary><div class="setting-body"><div class="field"><label>Your name</label><input data-setting="profileName" value="${esc(state.settings.profileName||'')}"></div><div class="mini-grid"><div class="field"><label>Default rest seconds</label><input data-setting="restSeconds" inputmode="numeric" value="${esc(state.settings.restSeconds)}"></div><div class="field"><label>Smith starting resistance (${displayWeightUnit()})</label><input data-setting="smithBarWeight" inputmode="decimal" value="${esc(roundedDisplayWeight(state.settings.smithBarWeight))}"></div><div class="field"><label>Units</label><select data-setting="units"><option value="lb" ${state.settings.units==='lb'?'selected':''}>lb</option><option value="kg" ${state.settings.units==='kg'?'selected':''}>kg</option></select></div><div class="field"><label>Theme</label><select data-setting="theme"><option value="dark" ${state.settings.theme==='dark'?'selected':''}>Dark</option><option value="light" ${state.settings.theme==='light'?'selected':''}>Light</option></select></div></div><label class="warm-toggle"><input type="checkbox" data-setting-check="autoRest" ${state.settings.autoRest?'checked':''}> Start the rest timer after logged lifting sets</label><label class="warm-toggle"><input type="checkbox" data-setting-check="sound" ${state.settings.sound?'checked':''}> Play an alert when rest ends</label><button class="btn primary block" data-action="save-settings">Save preferences</button></div></details><details class="setting"><summary>Quick-app links <span>⌄</span></summary><div class="setting-body"><div class="field"><label>Planet Fitness URL / Shortcut</label><input data-setting="pfAppUrl" value="${esc(state.settings.pfAppUrl||'')}"></div><div class="field"><label>Apple Music URL</label><input data-setting="musicAppUrl" value="${esc(state.settings.musicAppUrl||'')}"></div><p class="muted" style="font-size:12px;margin:0">On iPhone, the PF button can run a Shortcut named “Open Planet Fitness.”</p><button class="btn primary block" data-action="save-settings">Save links</button></div></details><details class="setting"><summary>Workout program <span>⌄</span></summary><div class="setting-body"><p class="muted" style="font-size:12px;margin:0">Your edited routine, quick templates, and machine setups are included in backups.</p><button class="btn block" data-action="open-program-editor" data-index="${state.settings.currentDayIndex}">Edit current workout</button><button class="btn danger block" style="margin-top:10px" data-action="reset-full-program">Restore complete original routine</button></div></details><details class="setting"><summary>Body goals <span>⌄</span></summary><div class="setting-body"><div class="mini-grid"><div class="field"><label>Target weight (${displayWeightUnit()})</label><input data-goal="targetWeight" inputmode="decimal" value="${esc(roundedDisplayWeight(state.goals.targetWeight))}"></div><div class="field"><label>Target body fat %</label><input data-goal="targetBodyFat" inputmode="decimal" value="${esc(state.goals.targetBodyFat||'')}"></div></div><p class="muted" style="font-size:12px;margin:0">Nutrition tracking is intentionally left out for now. This version focuses on training, recovery, strength, and body trends.</p><button class="btn primary block" data-action="save-settings">Save goals</button></div></details></div>`;}

    function saveSettings(){const priorUnit=displayWeightUnit(),nextUnit=$('[data-setting="units"]')?.value==='kg'?'kg':'lb';$$('[data-setting]').forEach(input=>{const key=input.dataset.setting;let value=input.value;if(key==='restSeconds')value=Number(value);else if(key==='smithBarWeight')value=toStorageWeight(Number(value),priorUnit);state.settings[key]=value;});state.settings.units=nextUnit;$$('[data-setting-check]').forEach(input=>state.settings[input.dataset.settingCheck]=input.checked);$$('[data-goal]').forEach(input=>{const n=Number(input.value);if(Number.isFinite(n))state.goals[input.dataset.goal]=input.dataset.goal==='targetWeight'?toStorageWeight(n,priorUnit):n;});rebuildProgress();saveState();render();showToast('Settings saved.');}

    function coachReport(){const st=stats(),metric=latestBodyMetric(),trend=getWeightTrend(),sessions=[...state.history].sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt)).slice(0,5),day=getDay(),unit=displayWeightUnit();const lines=[`NEXSET ${APP_VERSION_LABEL} — COACH CHECK-IN`,`Generated: ${new Date().toLocaleString()}`,`Next workout: Day ${day.day} — ${day.title} (${day.focus})`,`Stats: ${st.strengthSessions} strength sessions, ${st.recoverySessions} recovery days, ${st.totalSets} working sets, ${formatVolumeValue(st.totalVolume)} ${unit} total volume.`,metric?`Body metrics: latest ${formatWeightValue(metric.weight)}${metric.bodyFat?`, body fat ${metric.bodyFat}%`:''}; 7-day average ${Number.isFinite(trend.avg7)?cleanNumber(trend.avg7)+' '+unit:'collecting'}.`:'Body metrics: none logged yet.','',`Recent sessions:`];for(const s of sessions){lines.push(`- ${fmtDate(s.startedAt)} — ${s.title} (${formatDuration(s.durationMs)}), ${sessionWorkingSets(s)} working sets, ${formatVolumeValue(sessionVolume(s))} ${unit} volume`);for(const e of s.exercises||[]){const ex=entryExercise(e),logs=e.logs||[];if(ex&&logs.length)lines.push(`  • ${ex.name}: ${logs.map(l=>`${formatLogShort(ex,l)}${l.feel?' '+feelEmoji(l.feel):''}`).join(', ')}`);}}lines.push('',`Next-time recommendations:`);for(const day of getPlan())for(const ex of day.exercises){const p=state.exerciseProgress[ex.id];if(p?.note)lines.push(`- ${ex.name}: ${p.note}`);}lines.push('',`Ask: Review my training for fat loss and muscle definition. Tell me what to adjust next, without adding nutrition tracking yet.`);return lines.join('\n');}

    function weeklyReportText(){const w=weeklyReview();if(!w.hasData)return[`NEXSET ${APP_VERSION_LABEL} — WEEKLY REVIEW`,w.title,'No workout data yet.','Complete your first workout to establish a baseline.'].join('\n');return[`NEXSET ${APP_VERSION_LABEL} — WEEKLY REVIEW`,w.title,`Strength days: ${w.lifts}/5`,`Recovery days: ${w.recovery}`,`Working sets: ${w.sets}`,`Cardio: ${w.cardio} min`,`Hard sets: ${w.hardPct}%`,'','Wins:',...w.wins.map(x=>`- ${x}`),'','Next adjustments:',...w.adjustments.map(x=>`- ${x}`),'','Ask: Review this week and adjust my next week for fat loss and muscle definition. No nutrition tracking yet.'].join('\n');}

    async function shareText(text,title){try{if(navigator.share){await navigator.share({title,text});return;}await navigator.clipboard.writeText(text);showToast('Copied. Paste it into ChatGPT.');}catch(err){if(err?.name!=='AbortError'){downloadBlob(`${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.txt`,text,'text/plain');showToast('Report downloaded.');}}}

    function openApp(kind){const url=kind==='music'?state.settings.musicAppUrl:state.settings.pfAppUrl,fallback=kind==='music'?state.settings.musicFallbackUrl:state.settings.pfFallbackUrl;if(!url){showToast('Add this app link in More → Settings.');return;}try{window.location.href=url;setTimeout(()=>{if(!document.hidden&&fallback&&!url.startsWith('shortcuts:'))window.open(fallback,'_blank','noopener');},1200);}catch(_){if(fallback)window.open(fallback,'_blank','noopener');}}
    function openQuickMenu(){
      $('#quickMenu')?.remove();
      document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="quickMenu" data-action="close-quick-menu"><section class="bottom-sheet quick-menu-sheet" role="dialog" aria-modal="true" aria-label="Quick actions"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">NEXSET</span><h2>Quick actions</h2></div><button data-action="close-quick-menu" aria-label="Close">×</button></div><div class="quick-action-list"><button data-action="open-app" data-app="pf"><span>PF</span><div><strong>Planet Fitness</strong><small>Check in or view the crowd meter</small></div><b>›</b></button><button data-action="open-app" data-app="music"><span>♫</span><div><strong>Apple Music</strong><small>Start your gym music</small></div><b>›</b></button><button data-action="share-coach"><span>N</span><div><strong>Coach check-in</strong><small>Share your latest training report</small></div><b>›</b></button></div></section></div>`);
    }
    function closeQuickMenu(){ $('#quickMenu')?.remove(); }

    function exportBackup(){
      const exportedAt=new Date().toISOString();
      const payload={format:'nexset-backup',schemaVersion:DATA_SCHEMA_VERSION,appVersion:APP_VERSION,exportedAt,state,active};
      downloadBlob(`nexset-workout-backup-${dateKey()}-${APP_VERSION_LABEL}.json`,JSON.stringify(payload,null,2),'application/json');
      persistMeta({lastBackupAt:exportedAt});writeRecoverySnapshot('backup-export',true);
      if(currentView==='more'&&moreSection==='backup')renderMore();
      showToast('Backup exported.');
    }
    function downloadBlob(name,text,type){const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
    function validateBackup(parsed){
      if(!isPlainObject(parsed))throw new Error('Backup is not an object');
      const incoming=parsed.state||parsed;if(!isPlainObject(incoming)||!Array.isArray(incoming.history))throw new Error('Backup history is missing');
      const normalizedState=normalizeState(incoming);if(normalizedState.history.length>10000)throw new Error('Backup contains too many sessions');
      return{state:normalizedState,active:normalizeActiveSession(parsed.active,normalizedState.settings.units)};
    }

    function importBackup(file){
      if(!file)return;if(file.size>MAX_IMPORT_BYTES){showToast('That backup file is too large.');return;}
      const reader=new FileReader();
      reader.onerror=()=>showToast('Could not read that backup.');
      reader.onload=()=>{try{
        const validated=validateBackup(JSON.parse(reader.result));
        const count=validated.state.history.length;
        if(!confirm(`Import ${count} saved session${count===1?'':'s'}? Your current data will be kept in the local recovery copy.`))return;
        writeRecoverySnapshot('before-import',true);
        state=validated.state;active=validated.active;rebuildProgress();saveState({reason:'backup-import',snapshot:false});saveActive({reason:'backup-import',snapshot:false});
        persistMeta({lastImportAt:new Date().toISOString()});currentView=active?'workout':'home';moreSection='menu';render();showToast('Backup imported and validated.');
      }catch(error){console.warn('Backup import failed',error);showToast('Could not import that backup.');}};
      reader.readAsText(file);
    }
    function restoreRecovery(){
      try{
        const recovery=readRecoverySnapshot();if(!recovery?.state){showToast('No local recovery copy is available.');return;}
        const recoveredState=normalizeState(recovery.state),recoveredActive=normalizeActiveSession(recovery.active,recoveredState.settings.units);
        if(!confirm(`Restore the local copy from ${formatStatusTime(recovery.savedAt)}?`))return;
        state=recoveredState;active=recoveredActive;rebuildProgress();saveState({reason:'recovery-restore'});saveActive({reason:'recovery-restore'});
        persistMeta({lastRestoreAt:new Date().toISOString()});currentView=active?'workout':'home';moreSection='menu';render();showToast('Local recovery copy restored.');
      }catch(error){console.warn('Recovery restore failed',error);showToast('The recovery copy could not be restored.');}
    }
    function diagnosticPayload(){
      return{
        appVersion:APP_VERSION,schemaVersion:DATA_SCHEMA_VERSION,generatedAt:new Date().toISOString(),online:navigator.onLine,
        displayMode:matchMedia('(display-mode: standalone)').matches?'standalone':'browser',
        platform:navigator.platform||'',userAgent:navigator.userAgent,
        serviceWorker:{supported:'serviceWorker'in navigator,controlled:Boolean(navigator.serviceWorker?.controller)},
        data:{historyCount:state.history.length,bodyMetricCount:state.bodyMetrics.length,hasActiveWorkout:Boolean(active),currentDayIndex:state.settings.currentDayIndex,lastSavedAt:meta.lastSavedAt,lastBackupAt:meta.lastBackupAt,lastImportAt:meta.lastImportAt,lastRestoreAt:meta.lastRestoreAt,lastRecoveryAt:meta.lastRecoveryAt},
        lastError:meta.lastError||null
      };
    }
    function downloadDiagnostics(){downloadBlob(`nexset-diagnostics-${dateKey()}.json`,JSON.stringify(diagnosticPayload(),null,2),'application/json');showToast('Diagnostics downloaded.');}
    function refreshCache(){return (async()=>{try{writeRecoverySnapshot('before-cache-refresh',true);if('serviceWorker'in navigator){const regs=await navigator.serviceWorker.getRegistrations();for(const r of regs)await r.update();}if('caches'in window){for(const key of await caches.keys())if(key.startsWith(APP_CACHE_PREFIX))await caches.delete(key);}showToast('Cache refreshed. Reloading…');setTimeout(()=>location.reload(),700);}catch(_){location.reload();}})();}

    function showUpdateBanner(worker){pendingUpdateWorker=worker||serviceWorkerRegistration?.waiting||null;$('#appUpdateBanner')?.classList.add('show');}
    function dismissUpdateBanner(){$('#appUpdateBanner')?.classList.remove('show');}
    function watchInstallingWorker(worker){if(!worker)return;worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)showUpdateBanner(worker);});}
    async function registerServiceWorker(){
      if(!('serviceWorker'in navigator))return null;
      try{
        const registration=await navigator.serviceWorker.register('./service-worker.js');serviceWorkerRegistration=registration;
        if(registration.waiting&&navigator.serviceWorker.controller)showUpdateBanner(registration.waiting);
        registration.addEventListener('updatefound',()=>watchInstallingWorker(registration.installing));
        navigator.serviceWorker.addEventListener('controllerchange',()=>{if(updateReloading)return;updateReloading=true;location.reload();});
        setInterval(()=>registration.update().catch(()=>{}),60*60*1000);
        return registration;
      }catch(error){console.warn('Service worker registration failed',error);persistMeta({lastError:{at:new Date().toISOString(),source:'service-worker',message:String(error?.message||error)}});return null;}
    }
    async function checkForAppUpdate(){
      const registration=serviceWorkerRegistration||await registerServiceWorker();if(!registration){showToast('App updates are unavailable in this browser.');return;}
      showToast('Checking for an update…');
      try{await registration.update();await new Promise(resolve=>setTimeout(resolve,900));if(registration.waiting)showUpdateBanner(registration.waiting);else if(registration.installing){watchInstallingWorker(registration.installing);showToast('Update is downloading…');}else showToast('NEXSET is up to date.');}
      catch(_){showToast(navigator.onLine?'Could not check for an update.':'You are offline.');}
    }
    function installAppUpdate(){const worker=pendingUpdateWorker||serviceWorkerRegistration?.waiting;if(!worker){checkForAppUpdate();return;}writeRecoverySnapshot('before-app-update',true);$('.update-now')?.setAttribute('disabled','');worker.postMessage({type:'SKIP_WAITING'});}


    function cancelActive(){if(!active)return;syncDraftFromInputs();const hasActivity=active.exercises.some(e=>(e.logs||[]).length||String(e.notes||'').trim())||String(active.sessionNote||'').trim();const message=hasActivity?'Cancel this workout? All logged sets, notes, and elapsed time from this active session will be permanently discarded.':'Discard this empty workout? It will not be added to your history.';if(!confirm(message))return;active=null;removeExerciseToolsOverlay();saveActive();stopRest();currentView='home';render();showToast('Workout canceled. Nothing was saved.');}
    function deleteSession(id){if(!confirm('Delete this completed session?'))return;const index=state.history.findIndex(s=>s.id===id);if(index<0)return;const removed=deepClone(state.history[index]);state.history.splice(index,1);rebuildProgress();saveState({reason:'session-delete'});renderMore();showToast('Session deleted.',{label:'Undo',run:()=>{state.history.splice(index,0,removed);rebuildProgress();saveState({reason:'undo-session-delete'});moreSection='history';currentView='more';render();showToast('Session restored.');}});}

    function resetApp(){if(!confirm('Delete all workouts, body metrics, settings, and the local recovery copy from this device?'))return;localStorage.removeItem(STORAGE_KEY);localStorage.removeItem(ACTIVE_KEY);localStorage.removeItem(RECOVERY_KEY);localStorage.removeItem(META_KEY);meta=defaultMeta();state=defaultState();active=null;currentView='home';moreSection='menu';saveState({snapshot:false});render();showToast('App reset.');}

    document.addEventListener('click',event=>{
      const viewBtn=event.target.closest('[data-view]');if(viewBtn){haptic('light');if(viewBtn.dataset.view==='more')moreSection='menu';currentView=viewBtn.dataset.view;render();return;}
      const btn=event.target.closest('[data-action]');if(!btn)return;if(btn.classList.contains('sheet-backdrop')&&event.target!==btn)return;const action=btn.dataset.action;
      haptic(['finish-workout','complete-done','mark-rest','save-body'].includes(action)?'success':['start-workout','resume-workout','log-set'].includes(action)?'medium':'light');
      if(action==='start-workout')startWorkout();
      else if(action==='resume-workout'){currentView='workout';render();}
      else if(action==='pause-workout')pauseWorkout();
      else if(action==='cancel-workout')cancelActive();
      else if(action==='mark-rest')markRest();
      else if(action==='open-quick-builder')openQuickBuilder();
      else if(action==='close-quick-builder')closeQuickBuilder();
      else if(action==='add-quick-exercise')addQuickExercise(btn.dataset.id);
      else if(action==='remove-quick-exercise')removeQuickExercise(btn.dataset.index);
      else if(action==='move-quick-exercise')moveQuickExercise(btn.dataset.index,btn.dataset.delta);
      else if(action==='save-quick-template')saveQuickTemplate();
      else if(action==='delete-quick-template')deleteQuickTemplate(btn.dataset.id);
      else if(action==='load-quick-template'){closeQuickBuilder();openQuickBuilder(btn.dataset.id);}
      else if(action==='start-quick-workout')startQuickWorkout();
      else if(action==='open-program-editor')openProgramEditor(btn.dataset.index);
      else if(action==='close-program-editor')closeProgramEditor();
      else if(action==='program-editor-back'){programEditor.mode='overview';renderProgramEditor();}
      else if(action==='program-add-library'){syncProgramEditorFields();programEditor.mode='library';renderProgramEditor();}
      else if(action==='program-add-exercise')addProgramExercise(btn.dataset.id);
      else if(action==='edit-program-exercise'){syncProgramEditorFields();programEditor.mode='exercise';programEditor.editIndex=Number(btn.dataset.index);renderProgramEditor();}
      else if(action==='save-program-exercise')saveProgramExercise();
      else if(action==='move-program-exercise')moveProgramExercise(btn.dataset.index,btn.dataset.delta);
      else if(action==='remove-program-exercise')removeProgramExercise(btn.dataset.index);
      else if(action==='save-program-day')saveProgramDay();
      else if(action==='reset-program-day')resetProgramDay();
      else if(action==='reset-full-program'){if(confirm('Restore the complete original NEXSET routine? Workout history will stay.')){state.programPlan=deepClone(PLAN);saveState({reason:'program-reset'});render();showToast('Original routine restored.');}}
      else if(action==='previous-exercise')nextExercise(-1);
      else if(action==='next-exercise')nextExercise(1);
      else if(action==='next-open-exercise')nextOpenExercise();
      else if(action==='open-workout-list')openWorkoutList();
      else if(action==='close-workout-list')closeWorkoutList();
      else if(action==='jump-workout-exercise')jumpExercise(btn.dataset.index);
      else if(action==='skip-exercise')skipCurrentExercise();
      else if(action==='return-exercise')returnCurrentExercise();
      else if(action==='move-active-exercise')moveActiveExercise(btn.dataset.delta);
      else if(action==='open-replacement-picker')openReplacementPicker(btn.dataset.index,'replace');
      else if(action==='add-active-exercise')openReplacementPicker(active?.currentExerciseIndex,'add');
      else if(action==='close-replacement-picker')closeReplacementPicker();
      else if(action==='choose-replacement'){replacementContext.selectedId=btn.dataset.id;renderReplacementPicker();}
      else if(action==='replacement-back'){replacementContext.selectedId=null;renderReplacementPicker();}
      else if(action==='apply-replacement')applyReplacement(btn.dataset.scope);
      else if(action==='save-exercise-setup')saveExerciseSetup(btn.dataset.exerciseId);
      else if(action==='adjust-weight')adjustDraft('weight',Number(btn.dataset.delta));
      else if(action==='adjust-reps')adjustDraft('reps',Number(btn.dataset.delta));
      else if(action==='adjust-duration')adjustDraft('duration',Number(btn.dataset.delta));
      else if(action==='set-feel')setFeel(btn.dataset.feel);
      else if(action==='log-set')logSet();
      else if(action==='delete-last-set')deleteLastSet();
      else if(action==='edit-set')openSetEditor(btn.dataset.setIndex,btn.dataset.exerciseIndex);
      else if(action==='edit-history-set')openSetEditor(btn.dataset.setIndex,btn.dataset.exerciseIndex,btn.dataset.sessionId);
      else if(action==='close-set-editor')closeSetEditor();
      else if(action==='save-set-edit')saveSetEdit();
      else if(action==='delete-set-edit')deleteSetEdit();
      else if(action==='undo-toast')runToastAction();
      else if(action==='finish-workout')finishWorkout();
      else if(action==='add-rest')addRest();
      else if(action==='skip-rest')stopRest(true);
      else if(action==='complete-done'){lastCompletedSession=null;currentView='home';render();}
      else if(action==='change-day'){}
      else if(action==='select-plan-day'){state.settings.currentDayIndex=Number(btn.dataset.index)||0;saveState();renderPlan();showToast(`Day ${getDay().day} set as next.`);}
      else if(action==='open-app')openApp(btn.dataset.app);
      else if(action==='open-quick-menu')openQuickMenu();
      else if(action==='close-quick-menu')closeQuickMenu();
      else if(action==='open-body-sheet')openBodySheet();
      else if(action==='edit-body')openBodySheet(btn.dataset.id);
      else if(action==='close-body-sheet')closeBodySheet();
      else if(action==='open-exercise-tools')openExerciseTools();
      else if(action==='close-exercise-tools')closeExerciseTools();
      else if(action==='progress-tab'){progressTab=btn.dataset.tab||'overview';renderProgress();}
      else if(action==='more-section'){moreSection=btn.dataset.section||'menu';renderMore();}
      else if(action==='open-history'){moreSection='history';currentView='more';render();}
      else if(action==='more-back'){moreSection='menu';renderMore();}
      else if(action==='save-body')saveBody();
      else if(action==='delete-body')deleteBodyMetric(btn.dataset.id);
      else if(action==='share-weekly')shareText(weeklyReportText(),'NEXSET Weekly Review');
      else if(action==='share-coach')shareText(coachReport(),'NEXSET Coach Check-In');
      else if(action==='save-settings')saveSettings();
      else if(action==='export-backup')exportBackup();
      else if(action==='import-backup')$('#importFile').click();
      else if(action==='restore-recovery')restoreRecovery();
      else if(action==='download-diagnostics')downloadDiagnostics();
      else if(action==='check-update')checkForAppUpdate();
      else if(action==='install-update')installAppUpdate();
      else if(action==='dismiss-update')dismissUpdateBanner();
      else if(action==='refresh-cache')refreshCache();
      else if(action==='delete-session')deleteSession(btn.dataset.id);
      else if(action==='reset-app')resetApp();
    });

    document.addEventListener('change',event=>{
      if(event.target.matches('[data-action="change-day"]')){state.settings.currentDayIndex=Number(event.target.value)||0;saveState();renderWorkoutPreview();}
      if(event.target.matches('[data-action="progress-exercise"]')){state.settings.progressExerciseId=event.target.value;saveState();renderProgress();}
      if(event.target===$('#importFile')&&event.target.files?.[0]){importBackup(event.target.files[0]);event.target.value='';}
    });
    document.addEventListener('input',event=>{
      if(event.target.matches('[data-quick-search]')){if(quickBuilder){quickBuilder.query=event.target.value;const cursor=event.target.selectionStart;renderQuickBuilder();const input=$('[data-quick-search]');if(input){input.focus();input.setSelectionRange(cursor,cursor);}}return;}
      if(event.target.matches('[data-quick-name]')){if(quickBuilder)quickBuilder.name=event.target.value;return;}
      if(event.target.matches('[data-replacement-search]')){if(replacementContext){replacementContext.query=event.target.value;const cursor=event.target.selectionStart;renderReplacementPicker();const input=$('[data-replacement-search]');if(input){input.focus();input.setSelectionRange(cursor,cursor);}}return;}
      if(event.target.matches('[data-program-search]')){if(programEditor){programEditor.search=event.target.value;const cursor=event.target.selectionStart;renderProgramEditor();const input=$('[data-program-search]');if(input){input.focus();input.setSelectionRange(cursor,cursor);}}return;}
      if(!active) return;
      const entry=active.exercises[active.currentExerciseIndex];
      if(event.target.matches('[data-input="exercise-note"]')) entry.notes=event.target.value;
      else if(event.target.matches('[data-input="session-note"]')) active.sessionNote=event.target.value;
      else if(event.target.matches('[data-input="weight"]')) { const n=Number(event.target.value); if(Number.isFinite(n)) entry.draftWeight=toStorageWeight(n); }
      else if(event.target.matches('[data-input="reps"],[data-input="duration"]')) { const n=Number(event.target.value); if(Number.isFinite(n)) entry.draftReps=n; }
      saveActive();
    });
    document.addEventListener('change',event=>{ if(active&&event.target.matches('[data-input="warmup"]')) { active.exercises[active.currentExerciseIndex].draftWarmup=event.target.checked; saveActive(); renderFocusWorkout(); } });
    document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if($('#replacementOverlay'))closeReplacementPicker();else if($('#workoutListOverlay'))closeWorkoutList();else if($('#quickBuilderOverlay'))closeQuickBuilder();else if($('#programEditorOverlay'))closeProgramEditor();else if($('#setEditorOverlay'))closeSetEditor();else if($('#bodySheet'))closeBodySheet();else if($('#exerciseSheetOverlay'))closeExerciseTools();});
    document.addEventListener('visibilitychange',()=>{if(!document.hidden){if(active?.restTimer&&!restState)restoreRestTimer();else if(restState)updateRest();}});

    window.addEventListener('error',event=>persistMeta({lastError:{at:new Date().toISOString(),source:'runtime',message:String(event.message||'Unknown error')}}));
    window.addEventListener('unhandledrejection',event=>persistMeta({lastError:{at:new Date().toISOString(),source:'promise',message:String(event.reason?.message||event.reason||'Unhandled promise rejection')}}));
    window.addEventListener('offline',()=>showToast('You are offline. Saved workouts remain available.'));
    window.addEventListener('online',()=>showToast('Back online.'));

    rebuildProgress();saveState({reason:'app-start'});saveActive({reason:'app-start',snapshot:false});render();restoreRestTimer();
    if(startupNotice)setTimeout(()=>showToast(startupNotice),450);
    window.addEventListener('load',registerServiceWorker);
  })();
  