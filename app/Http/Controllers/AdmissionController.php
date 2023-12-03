<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Admission;


class AdmissionController extends Controller
{
    public function case_insert(Request $request){
        try {
            // return $request;
            DB::beginTransaction();
            $check = Admission::where('case_no',strtoupper($request->case_no))->first();
            if($check === null){
                $case = new Admission();
                $case->case_no = strtoupper($request->case_no);
                $case->patient_id = $request->patient_id;
                $case->doctor_id = $request->doctor_id;
                $case->room_id = $request->room_id;
                $case->bed_name = $request->bed_name;
                $case->relationship = strtoupper($request->relationship);
                $case->husband_name = strtoupper($request->husband_name);
                $case->save();
                // return 'success';
            }else{
                return 1;
            }
            
            DB::commit();
            return 'success';
        } catch (\Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }catch(\QueryException $q){
            DB::rollBack();
            return $q;
        }
        
    }

    public function get_case(Request $request){
        try {
            DB::beginTransaction();
            $cases = Admission::select(
                'admissions.id',
                'admissions.case_no',
                'admissions.patient_id',
                'admissions.doctor_id',
                'admissions.room_id',
                'admissions.bed_name',
                'admissions.relationship',
                'admissions.husband_name',
                'patients.name as patient_name',
                'doctors.name as doctor_name',
                'rooms.name as room_name',
                'rooms.room_type',
                'admissions.created_at AS admission_date',
            )
            ->leftJoin('patients','patients.id','admissions.patient_id')
            ->leftJoin('doctors','doctors.id','admissions.doctor_id')
            ->leftJoin('rooms','rooms.id','admissions.room_id')
            ->orderBy('id','DESC')
            ->get();
            return $cases;
            DB::commit();
            return 'success';
        } catch (\Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }catch(\QueryException $q){
            DB::rollBack();
            return $q;
        }
    }

    public function case_update(Request $request){
        try {
            // return $request;
            DB::beginTransaction();
            $case = Admission::find($request->id);
            // $case->case_no = strtoupper($request->case_no);
            $case->patient_id = $request->patient_id;
            $case->doctor_id = $request->doctor_id;
            $case->room_id = $request->room_id;
            $case->bed_name = $request->bed_name;
            $case->relationship = strtoupper($request->relationship);
            $case->husband_name = strtoupper($request->husband_name);
            $case->save();
            DB::commit();
            return 'success';
        } catch (\Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }catch(\QueryException $q){
            DB::rollBack();
            return $q;
        }
        
    }
    public function case_delete(Request $request){
        try {
            // return $request;
            DB::beginTransaction();
            $case = Admission::find($request->id);
            $case->delete();
            DB::commit();
            return 'success';
        } catch (\Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }catch(\QueryException $q){
            DB::rollBack();
            return $q;
        }
        
    }
}
