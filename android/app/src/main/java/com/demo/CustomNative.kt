package com.demo
import android.content.ContentValues
import android.content.Context
import android.database.Cursor

import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteException
import android.database.sqlite.SQLiteOpenHelper
import android.os.Build
import android.telecom.Call
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.*
import org.json.JSONArray
import org.json.JSONObject
import java.util.*
// This file is use for fetching and inserting the employee details
class CustomNative(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private lateinit var databaseHandler:DatabaseHandler

    override fun getName(): String {
        return "CustomNative"
    }

    override fun getConstants(): Map<String, Any>? {
        val constants = HashMap<String, Any>()
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT)
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG)
        return constants
    }


    @ReactMethod(isBlockingSynchronousMethod = true)
    fun insertEmployee(name: String,email: String,path: String):Boolean{
        databaseHandler = DatabaseHandler(reactApplicationContext);
        var success = databaseHandler.addEmployee(name,email,path);
        return success != -1L
    }

    @ReactMethod
    fun ViewData( failure: Callback,success2: Callback){
        try {
            databaseHandler = DatabaseHandler(reactApplicationContext);
            var success = databaseHandler.viewEmployee();
            success2.invoke(success);
        }catch(e: Exception) {
            failure.invoke( e);
        }
    }

    companion object {

        private val DURATION_SHORT_KEY = "SHORT"
        private val DURATION_LONG_KEY = "LONG"
    }
}


class DatabaseHandler(context: Context): SQLiteOpenHelper(context,DATABASE_NAME,null,DATABASE_VERSION) {
    companion object {
        private val DATABASE_VERSION = 1
        private val DATABASE_NAME = "EmployeeDatabase"
        private val TABLE_CONTACTS = "tbl_EmployeesMaster"
        private val KEY_ID = "empID"
        private val KEY_NAME = "empName"
        private val KEY_EMAIL = "empEmailId"
        private val KEY_PHONE_NO = "empPhone"
        private val KEY_PATH = "path"
    }

    override fun onCreate(db: SQLiteDatabase?) {

        val CREATE_CONTACTS_TABLE = ("CREATE TABLE " + TABLE_CONTACTS + "("
                + KEY_ID + " INTEGER PRIMARY KEY,"
                + KEY_EMAIL + " TEXT," + KEY_NAME + " TEXT,"  + KEY_PATH + " TEXT"  + ")")
        db?.execSQL(CREATE_CONTACTS_TABLE)
    }

    override fun onUpgrade(db: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {
        //  TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        db!!.execSQL("DROP TABLE IF EXISTS " + TABLE_CONTACTS)
        onCreate(db)
    }


    //This method is used to insert data
    fun addEmployee(name: String, email: String, path: String):Long{
        val db = this.writableDatabase
        val contentValues = ContentValues()
        contentValues.put(KEY_NAME,name)
        contentValues.put(KEY_EMAIL,email )
        contentValues.put(KEY_PATH,path)

        val success = db.insert(TABLE_CONTACTS, null, contentValues)
        db.close() // Closing database connection
        return success
    }
    //This method is used to read data
    fun viewEmployee():WritableNativeArray{
        val empList:ArrayList<CustomNative> = ArrayList<CustomNative >()
        val selectQuery = "SELECT  * FROM $TABLE_CONTACTS"
        val db = this.readableDatabase
        var cursor: Cursor? = null
        try{
            cursor = db.rawQuery(selectQuery, null)
        }catch (e: SQLiteException) {
            db.execSQL(selectQuery)
            return WritableNativeArray()
        }
        var empId: Int
        var empName: String
        var empEmail: String
        var empPath: String

        var objArray: WritableNativeArray = WritableNativeArray();
        if (cursor.moveToFirst()) {
            do {
                var objJson: WritableNativeMap = WritableNativeMap();

                empName = cursor.getString(cursor.getColumnIndex("empName"))
                empEmail = cursor.getString(cursor.getColumnIndex("empEmailId"))
                empPath = cursor.getString(cursor.getColumnIndex("path"));

                objJson.putString("empName",empName);
                objJson.putString("empEmailId",empEmail);
                objJson.putString("path",empPath);
                objArray.pushMap(objJson);
            } while (cursor.moveToNext())
        }
        return objArray;
    }


}