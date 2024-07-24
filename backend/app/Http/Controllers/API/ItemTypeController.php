<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreItemTypeRequest;
use App\Http\Requests\UpdateItemTypeRequest;
use App\Http\Resources\ItemTypeResource;
use App\Services\ItemTypeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class ItemTypeController extends Controller
{
    protected $itemTypeService;

    public function __construct(ItemTypeService $itemTypeService)
    {
        $this->itemTypeService = $itemTypeService;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $itemTypes = $this->itemTypeService->getAllItemTypes();
            return response()->json(ItemTypeResource::collection($itemTypes), Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
        try {
            $itemType = $this->itemTypeService->getItemTypeById($id);
            if ($itemType) {
                return response()->json(new ItemTypeResource($itemType), Response::HTTP_OK);
            }
            return response()->json(['message' => 'Item type not found.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreItemTypeRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreItemTypeRequest $request)
    {
        try {
            $data = $request->validated();
            $itemType = $this->itemTypeService->createItemType($data);
            return response()->json(new ItemTypeResource($itemType), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateItemTypeRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateItemTypeRequest $request, int $id)
    {
        try {
            $data = $request->validated();
            $itemType = $this->itemTypeService->updateItemType($id, $data);
            if ($itemType) {
                return response()->json(new ItemTypeResource($itemType), Response::HTTP_OK);
            }
            return response()->json(['message' => 'Item type not found.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id)
    {
        try {
            $deleted = $this->itemTypeService->deleteItemType($id);
            if ($deleted) {
                return response()->json(['message' => 'Item type deleted successfully.'], Response::HTTP_OK);
            }
            return response()->json(['message' => 'Item type not found.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Something went wrong.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
